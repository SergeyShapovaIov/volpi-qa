/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))"
                },
                safe: {
                    DEFAULT: "hsl(var(--safe))",
                    foreground: "hsl(var(--safe-foreground))"
                },
                danger: {
                    DEFAULT: "hsl(var(--danger))",
                    foreground: "hsl(var(--danger-foreground))"
                },
                pale: {
                    DEFAULT: "hsl(var(--pale))",
                    foreground: "hsl(var(--pale-foreground))"
                },
                border: "hsl(var(--border))",
                link: "hsl(var(--link))",
                shadow: "hsl(var(--shadow))",
                skeleton: "hsl(var(--skeleton))",
            },
        },
    },
    plugins: [],
}
