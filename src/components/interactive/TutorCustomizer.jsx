import React from 'react';
import { motion } from 'motion/react';
import { User, Smile, Mic, Palette, Shirt, Scissors } from 'lucide-react';
import { PERSONALITIES, APPEARANCE_OPTIONS } from './constants';

const TutorCustomizer = ({ settings, onApply, onClose }) => {

    const handleChange = (key, value) => {
        onApply({ ...settings, [key]: value });
    };

    const handleAppearanceChange = (key, value) => {
        onApply({
            ...settings,
            appearance: { ...settings.appearance, [key]: value }
        });
    };

    const handleVoiceChange = (key, value) => {
        onApply({
            ...settings,
            voice: { ...settings.voice, [key]: parseFloat(value) }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <div className="bg-[#1A1A24] w-full max-w-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#12121A]">
                    <h2 className="text-xl font-black text-white flex items-center gap-3">
                        <User className="text-purple-500" size={20} />
                        AI Tutor Customization
                    </h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto space-y-8 custom-scrollbar">

                    {/* Personality Section */}
                    <section>
                        <h3 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Smile size={14} /> Personality
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {PERSONALITIES.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => handleChange('personality', p.id)}
                                    className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${settings.personality === p.id
                                        ? 'bg-purple-500/20 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                        : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10'
                                        }`}
                                >
                                    <span className="capitalize text-xs font-bold">{p.label}</span>
                                    <span className="text-[9px] opacity-70 text-center leading-tight">
                                        {p.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Appearance Section */}
                    <section>
                        <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Palette size={14} /> Appearance
                        </h3>

                        <div className="grid grid-cols-1 gap-6">
                            {/* Hairstyle */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/70 flex items-center gap-2">
                                    <Scissors size={12} /> Hairstyle
                                </label>
                                <div className="flex gap-2">
                                    {APPEARANCE_OPTIONS.hairstyles.map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => handleAppearanceChange('hairstyle', style)}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${settings.appearance.hairstyle === style
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                                                }`}
                                        >
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clothing */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/70 flex items-center gap-2">
                                    <Shirt size={12} /> Clothing
                                </label>
                                <div className="flex gap-2">
                                    {APPEARANCE_OPTIONS.clothing.map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => handleAppearanceChange('clothing', style)}
                                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${settings.appearance.clothing === style
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white/5 text-white/50 hover:bg-white/10'
                                                }`}
                                        >
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Voice Section */}
                    <section>
                        <h3 className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Mic size={14} /> Voice Settings
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-white/70">
                                    <span>Pitch</span>
                                    <span>{settings.voice.pitch.toFixed(1)}x</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2.0"
                                    step="0.1"
                                    value={settings.voice.pitch}
                                    onChange={(e) => handleVoiceChange('pitch', e.target.value)}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold text-white/70">
                                    <span>Speed</span>
                                    <span>{settings.voice.speed.toFixed(1)}x</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.5"
                                    max="2.0"
                                    step="0.1"
                                    value={settings.voice.speed}
                                    onChange={(e) => handleVoiceChange('speed', e.target.value)}
                                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500"
                                />
                            </div>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/10 bg-[#12121A] flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Apply Changes
                    </button>
                </div>

            </div>
        </motion.div>
    );
};

export default TutorCustomizer;
