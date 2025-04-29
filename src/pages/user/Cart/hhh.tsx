import { useState, useEffect, ChangeEvent } from "react";

const options = {
  transformation: [
    "portrait_angle_change",
    "expression_change",
    "outfit_change",
    "style_transfer",
    "age_progression",
    "age_regression",
  ],
  source_view: ["direct_frontal", "profile", "3/4_angle", "low_angle"],
  target_view: ["3/4_angle", "profile", "overhead", "looking_down"],
  angle_degrees: ["15", "30", "45", "90"],
  style: [
    "1920s_hollywood_glamour",
    "renaissance_oil_painting",
    "noir_film_still",
    "futuristic_cyberpunk",
    "iranian_miniature",
  ],
  color_mode: ["black_and_white", "sepia", "full_color", "duotone"],
  contrast: ["high", "medium", "low", "dramatic"],
  lighting_type: ["studio_spot", "natural_light", "candlelight"],
  lighting_effect: ["chiaroscuro", "rim_light", "flat"],
  highlights: ["strong_on_one_side", "even"],
  shadows: ["deep_on_opposite_side", "diffused"],
  reference: [
    "george_hurrell_portraits",
    "annie_leibovitz",
    "salvador_dali",
    "steve_mccurry",
  ],
  gaze_direction: [
    "slightly_away_from_camera",
    "direct",
    "looking_down",
    "to_the_side",
  ],
  preserve: [
    "identity",
    "distinctive_features",
    "facial_expression",
    "hair_texture",
    "emotion",
  ],
  focus: ["sharp_on_eyes", "soft_focus"],
  skin_texture: ["smooth_luminous", "natural", "aged"],
  finish: ["silver_gelatin_print", "digital_painting"],
};

const previewImages: Record<string, Record<string, string>> = {
  style: {
    "1920s_hollywood_glamour": "/previews/1920s.jpg",
    renaissance_oil_painting: "/previews/renaissance.jpg",
    noir_film_still: "/previews/noir.jpg",
    futuristic_cyberpunk: "/previews/cyberpunk.jpg",
    iranian_miniature: "/previews/miniature.jpg",
  },
  lighting_type: {
    studio_spot: "/previews/lighting_studio.jpg",
    natural_light: "/previews/lighting_natural.jpg",
    candlelight: "/previews/lighting_candle.jpg",
  },
  contrast: {
    high: "/previews/contrast_high.jpg",
    low: "/previews/contrast_low.jpg",
  },
};

export default function PromptBuilder() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const [previewCategory, setPreviewCategory] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const keys = Object.keys(previewImages);
    for (const key of keys) {
      if (form[key] && previewImages[key][form[key]]) {
        setPreview(previewImages[key][form[key]]);
        setPreviewCategory(key);
        break;
      }
    }
  }, [form]);

  const buildPrompt = (): string => {
    return `"transformation": "${form.transformation}",\n"source_view": "${
      form.source_view
    }",\n"target_view": "${form.target_view}",\n"angle_degrees": ${
      form.angle_degrees
    },\n"style": "${form.style}",\n"color_mode": "${
      form.color_mode
    }",\n"contrast": "${form.contrast}",\n"lighting": {\n  "type": "${
      form.lighting_type
    }",\n  "effect": "${form.lighting_effect}",\n  "highlights": "${
      form.highlights
    }",\n  "shadows": "${form.shadows}"\n},\n"reference": "${
      form.reference
    }",\n"subject": {\n  "gaze_direction": "${
      form.gaze_direction
    }",\n  "preserve": [${
      form.preserve
        ? form.preserve
            .split(",")
            .map((p) => `"${p.trim()}"`)
            .join(", ")
        : ""
    }]\n},\n"technical_details": {\n  "focus": "${
      form.focus
    }",\n  "skin_texture": "${form.skin_texture}",\n  "finish": "${
      form.finish
    }"\n}`;
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setTimeout(() => {
      setImagePrompt(
        `"style": "1920s_hollywood_glamour",\n"contrast": "high",\n"lighting": { "type": "studio_spot", "effect": "chiaroscuro" }`
      );
    }, 1500);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Prompt Builder</h2>

      <label className="flex items-center gap-2 cursor-pointer text-blue-600">
        <span className="text-xl">📤</span> Upload a reference image
        <input type="file" className="hidden" onChange={handleImageUpload} />
      </label>

      {imagePrompt && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm text-gray-700">Inferred Prompt from image:</p>
          <textarea
            value={imagePrompt}
            readOnly
            className="mt-2 w-full border rounded-md p-2 text-sm"
          />
        </div>
      )}

      {preview && (
        <img
          src={preview}
          alt={previewCategory ?? "preview"}
          width={300}
          height={200}
          className="rounded-lg"
        />
      )}

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="grid gap-4">
          {Object.entries(options).map(([key, values]) => (
            <div key={key} className="space-y-1">
              <label className="block font-medium capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <select
                className="w-full border rounded-md px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => updateField(key, e.target.value)}
              >
                <option value="">Select {key}</option>
                {values.map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-white">
        <label className="block mb-2 font-medium">
          Preserve (comma separated)
        </label>
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          placeholder="e.g. identity, facial_expression"
          onChange={(e) => updateField("preserve", e.target.value)}
        />
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <label className="block mb-2 font-medium">Final Prompt</label>
        <textarea
          value={buildPrompt()}
          readOnly
          className="w-full h-60 border rounded-md p-2 text-sm"
        />
      </div>

      {preview && (
        <div className="text-center text-sm text-gray-500">
          Preview for <span className="font-medium">{previewCategory}</span>
        </div>
      )}
    </div>
  );
}
