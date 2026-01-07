// ============================================
// JUST FOR YOU SCRIPT - QUOTE GENERATOR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Just For You page loaded');
    
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateQuote);
    }
});

// Collection of encouraging quotes and messages
const encouragingQuotes = [
    {
        text: "You are braver than you believe, stronger than you seem, and loved more than you know.",
        author: "— A reminder just for you"
    },
    {
        text: "On the days when you feel like you're not enough, remember: you are exactly who you need to be.",
        author: "— Always remember this"
    },
    {
        text: "Your soft heart is not a weakness—it's your superpower. Never let anyone make you feel otherwise.",
        author: "— From someone who sees you"
    },
    {
        text: "Even on your hardest days, you are doing better than you think. Be proud of yourself.",
        author: "— You deserve this reminder"
    },
    {
        text: "You don't need to be perfect. You just need to be you. And that's more than enough.",
        author: "— The truth about you"
    },
    {
        text: "Every step forward, no matter how small, is still progress. Keep going—you're doing amazing.",
        author: "— Keep believing"
    },
    {
        text: "Your feelings are valid. Your tears are valid. You're allowed to feel everything deeply.",
        author: "— It's okay to feel"
    },
    {
        text: "The world is better because you're in it. Never forget how much you matter.",
        author: "— You are important"
    },
    {
        text: "Take your time. Healing isn't linear, and that's okay. You're exactly where you need to be.",
        author: "— Be patient with yourself"
    },
    {
        text: "You are worthy of all the love, kindness, and good things that come your way.",
        author: "— You deserve happiness"
    },
    {
        text: "Your gentle soul makes the world softer. Never apologize for being who you are.",
        author: "— Stay true to you"
    },
    {
        text: "Even when you feel alone, remember: you are thought of, you are cared for, you are loved.",
        author: "— You're never truly alone"
    },
    {
        text: "It's okay to rest. It's okay to take breaks. You don't always have to be strong.",
        author: "— Rest when you need to"
    },
    {
        text: "You've survived 100% of your worst days. That means you're stronger than you realize.",
        author: "— Look how far you've come"
    },
    {
        text: "Your smile lights up more hearts than you know. Never stop being the light you are.",
        author: "— Keep shining"
    },
    {
        text: "Some days will be hard, and that's okay. What matters is that you keep showing up for yourself.",
        author: "— One day at a time"
    },
    {
        text: "You are growing into someone incredible. Trust the process, even when it's difficult.",
        author: "— Believe in your journey"
    },
    {
        text: "Your loyalty and love are gifts. The right people will cherish them—and you.",
        author: "— You are appreciated"
    },
    {
        text: "When you doubt yourself, remember: someone believes in you completely, even when you can't.",
        author: "— I believe in you"
    },
    {
        text: "You deserve all the good things life has to offer. Don't settle for anything less.",
        author: "— Never forget your worth"
    }
];

let lastQuoteIndex = -1;

function generateQuote() {
    const quoteCard = document.getElementById('quoteCard');
    const quoteText = document.getElementById('quoteText');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    // Add updating animation
    quoteCard.classList.add('updating');
    
    setTimeout(() => {
        // Get random quote (different from last one)
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * encouragingQuotes.length);
        } while (randomIndex === lastQuoteIndex && encouragingQuotes.length > 1);
        
        lastQuoteIndex = randomIndex;
        const selectedQuote = encouragingQuotes[randomIndex];
        
        // Update text with animation
        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';
        
        setTimeout(() => {
            quoteText.textContent = `"${selectedQuote.text}"`;
            quoteAuthor.textContent = selectedQuote.author;
            
            quoteText.style.transition = 'opacity 0.8s ease';
            quoteAuthor.style.transition = 'opacity 0.8s ease';
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
            
            quoteCard.classList.remove('updating');
        }, 300);
        
    }, 500);
}