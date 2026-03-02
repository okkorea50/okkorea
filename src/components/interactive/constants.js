export const DEFAULT_TUTOR_SETTINGS = {
    name: "Dr. Sophie",
    personality: 'friendly', // 'formal' | 'friendly' | 'humorous'
    appearance: {
        hairstyle: 'long', // 'short' | 'long' | 'curly'
        clothing: 'casual', // 'suit' | 'casual' | 'hoodie'
    },
    voice: {
        pitch: 1.0,
        speed: 1.0
    }
};

export const PERSONALITIES = [
    { id: 'formal', label: 'Formal', description: 'Professional & Concise' },
    { id: 'friendly', label: 'Friendly', description: 'Warm & Encouraging' },
    { id: 'humorous', label: 'Humorous', description: 'Fun & Witty' }
];

export const APPEARANCE_OPTIONS = {
    hairstyles: ['short', 'long', 'curly'],
    clothing: ['suit', 'casual', 'hoodie']
};
