document.addEventListener('DOMContentLoaded', function () {
    var revealItems = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });

        revealItems.forEach(function (item) {
            observer.observe(item);
        });

        // Fallback: reveal all items after 3 seconds in case observer doesn't fire (mobile)
        setTimeout(function () {
            revealItems.forEach(function (item) {
                if (!item.classList.contains('visible')) {
                    item.classList.add('visible');
                }
            });
        }, 3000);
    } else {
        revealItems.forEach(function (item) {
            item.classList.add('visible');
        });
    }

    var playPauseButton = document.getElementById('audio-play-pause');
    var stopButton = document.getElementById('audio-stop');
    var statusText = document.getElementById('audio-status');
    var synth = window.speechSynthesis;

    if (!playPauseButton || !stopButton || !statusText || !synth) {
        return;
    }

    var summaryScript = "Welcome to A.I. in India. ... Let me tell you an amazing story, about how Artificial Intelligence is changing lives, across our incredible country. ... Imagine a farmer in Maharashtra, worried about his crops. He does not know when to water them, or how much fertilizer to use. But now, with A.I. powered tools like Microsoft FarmVibes, satellites in space, look at his field, and tell him exactly what to do. ... The result? Forty percent more food, from the same land, using half the water. That is like magic, powered by technology. ... In Telangana, chili farmers use A.I. chatbots, to find the best prices for their produce. Many of them, have doubled their income. And across India, the Kisan e-Mitra chatbot, speaks eleven Indian languages, answering twenty thousand farmer questions, every single day. ... Now let us visit a small village health centre. There are no specialist doctors here. But, an A.I. system can read X-rays and eye scans in seconds, detecting diseases like tuberculosis, and diabetes related blindness. ... The eSanjeevani telemedicine platform, has already completed over thirty crore consultations, bringing doctor quality care, to people who would have had to travel hundreds of kilometers. ... Companies like Qure A.I. from Mumbai, and Niramai from Bangalore, are using A.I. to detect cancer early, saving thousands of lives. And A.I. chatbots like Wysa, are even helping people with mental health, available twenty four hours a day, in multiple Indian languages. ... Education is being transformed too. The DIKSHA platform, provides free digital learning, in thirty six Indian languages. A.I. tutors understand how each student learns. If you find maths difficult, the A.I. gives you easier steps. If you are great at science, it challenges you more. ... No student is left behind. ... The Skill India Digital Hub, offers free A.I. and I.T. courses, so young people in small towns and villages, can get jobs in technology. And the government is setting up, five hundred and seventy A.I. labs, in tier two and tier three cities across India. ... Here is something really cool. The Namo Drone Didi programme, is training fifteen thousand rural women, to fly A.I. powered drones. These women are becoming tech entrepreneurs, in their own villages, earning over one lakh rupees per month, while helping farmers spray crops more efficiently. ... A.I. is also protecting our environment. Scientists at I.I.T.M. Pune, use A.I. to predict monsoons, four weeks in advance, helping farmers plan better. The SAFAR system monitors air quality in our cities, and A.I. powered cameras track tigers, and wildlife in our forests. ... And when it comes to money, A.I. has helped open fifty seven crore bank accounts, through Jan Dhan Yojana. U.P.I., which handles eighty percent of India's digital payments, uses A.I. to detect fraud, and keep your money safe. Even street vendors can now get small loans, through P.M. SVANidhi, with A.I. helping decide who qualifies. ... In twenty twenty four, our government launched the India A.I. Mission, with over ten thousand crore rupees, to bring A.I. to every corner of India. The goal? ... To make sure A.I. works for every Indian, from our biggest cities, to our smallest villages. ... This is the story of A.I. in India. Technology with a heart, designed not just for profit, but for people. ... And the best part? This is just the beginning. As young students, you are the generation, that will take this forward, and build an even more amazing, A.I. powered India. ... Thank you for listening. Now explore the categories below, to learn more about each area.";
    var utterance = null;
    var hasStarted = false;

    function setStatus(message, isSpeaking, buttonHtml) {
        statusText.textContent = message;
        playPauseButton.innerHTML = buttonHtml;
        if (isSpeaking) {
            playPauseButton.classList.add('is-speaking');
        } else {
            playPauseButton.classList.remove('is-speaking');
        }
    }

    function pickVoice() {
        var voices = synth.getVoices();
        var naturalVoice = null;
        var indianVoice = null;
        var englishVoice = null;

        voices.forEach(function (voice) {
            var name = (voice.name || '').toLowerCase();
            var lang = (voice.lang || '').toLowerCase();

            // Priority 1: Natural voices (Windows 11 high-quality voices)
            if (!naturalVoice && name.indexOf('natural') !== -1 && lang.indexOf('en') === 0) {
                naturalVoice = voice;
            }
            // Priority 2: Indian English voice
            if (!indianVoice && (lang.indexOf('en-in') === 0 || name.indexOf('india') !== -1)) {
                indianVoice = voice;
            }
            // Priority 3: Any English voice that sounds good (Zira, Aria, David)
            if (!englishVoice && lang.indexOf('en') === 0 && (name.indexOf('zira') !== -1 || name.indexOf('aria') !== -1 || name.indexOf('david') !== -1 || name.indexOf('mark') !== -1)) {
                englishVoice = voice;
            }
        });

        return naturalVoice || indianVoice || englishVoice || (voices.length > 0 ? voices[0] : null);
    }

    function buildUtterance() {
        utterance = new SpeechSynthesisUtterance(summaryScript);
        utterance.rate = 0.92;
        utterance.pitch = 1.0;
        utterance.voice = pickVoice();
        utterance.onstart = function () {
            hasStarted = true;
            setStatus('Playing...', true, '<i class="fas fa-pause"></i>');
        };
        utterance.onend = function () {
            hasStarted = false;
            utterance = null;
            setStatus('Finished! Click Play to listen again', false, '<i class="fas fa-play"></i>');
        };
        utterance.onpause = function () {
            setStatus('Paused', false, '<i class="fas fa-play"></i>');
        };
        utterance.onresume = function () {
            setStatus('Playing...', true, '<i class="fas fa-pause"></i>');
        };
        utterance.onerror = function () {
            hasStarted = false;
            utterance = null;
            setStatus('Audio unavailable right now', false, '<i class="fas fa-play"></i>');
        };
    }

    function startSpeech() {
        synth.cancel();
        buildUtterance();
        synth.speak(utterance);
    }

    playPauseButton.addEventListener('click', function () {
        if (synth.speaking) {
            if (synth.paused) {
                synth.resume();
            } else {
                synth.pause();
            }
            return;
        }

        if (!hasStarted || !utterance) {
            startSpeech();
        }
    });

    stopButton.addEventListener('click', function () {
        synth.cancel();
        hasStarted = false;
        utterance = null;
        setStatus('Stopped. Click Play to listen again', false, '<i class="fas fa-play"></i>');
    });

    if (typeof synth.onvoiceschanged !== 'undefined') {
        synth.onvoiceschanged = function () {
            if (utterance && !synth.speaking) {
                utterance.voice = pickVoice();
            }
        };
    }

    window.addEventListener('beforeunload', function () {
        synth.cancel();
    });
});

