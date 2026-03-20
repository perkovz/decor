declare const config: {
    darkMode: ["class"];
    content: string[];
    theme: {
        container: {
            center: true;
            padding: string;
            screens: {
                "2xl": string;
            };
        };
        extend: {
            colors: {
                border: string;
                input: string;
                ring: string;
                background: string;
                foreground: string;
                primary: {
                    DEFAULT: string;
                    foreground: string;
                };
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                popover: {
                    DEFAULT: string;
                    foreground: string;
                };
                card: {
                    DEFAULT: string;
                    foreground: string;
                };
                brand: {
                    DEFAULT: string;
                    foreground: string;
                    soft: string;
                    ink: string;
                };
            };
            borderRadius: {
                xl: string;
                lg: string;
                md: string;
                sm: string;
            };
            boxShadow: {
                frame: string;
                lift: string;
                soft: string;
            };
            fontFamily: {
                sans: [string, string];
                display: [string, string];
            };
            backgroundImage: {
                "page-glow": string;
                "brand-gradient": string;
            };
            keyframes: {
                "accordion-down": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
                "accordion-up": {
                    from: {
                        height: string;
                    };
                    to: {
                        height: string;
                    };
                };
            };
            animation: {
                "accordion-down": string;
                "accordion-up": string;
            };
        };
    };
    plugins: {
        handler: () => void;
    }[];
};
export default config;
