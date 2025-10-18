// كتم صوت الفيديو تلقائيًا عند التشغيل
window.addEventListener('DOMContentLoaded', function() {
	var vid = document.getElementById('bgVideo');
	vid.muted = false;
	vid.volume = 0.7;
});
// رسائل القصة بالإنجليزي
const storyMessages = [
	"In a quiet corner of the universe, a star was born—gentle, radiant, and full of hope.",
	"As she grew, she journeyed through galaxies, sometimes feeling lost, sometimes searching for her place among the stars.",
	"But her heart always knew how to find warmth, even in the coldest space.",
	"She lifts others up, even when her own wings are tired—her kindness shines brighter than any constellation.",
	"Her spirit is playful, her dreams are bold, and her courage inspires everyone around her.",
	"Through every challenge, every storm, she remains strong—her story is written in the stars.",
	"No matter how far she travels, she is never alone. There are hearts that love her, and souls that wish her happiness from the depths of their being.",
	"She is the rarest star, unique in all the universe—she is Habiba.",
];

function showStoryMessages(msgs) {
	const msgBox = document.getElementById('storyMsg');
	let i = 0;
	function typeWriter(text, cb) {
		msgBox.innerHTML = '';
		let j = 0;
		function type() {
			msgBox.innerHTML = text.slice(0, j) + '<span style="opacity:0.5;">|</span>';
			if (j < text.length) {
				j++;
				setTimeout(type, 28);
			} else {
				msgBox.innerHTML = text;
				if (cb) cb();
			}
		}
		type();
	}
	function showNext() {
		gsap.set(msgBox, {opacity: 0, scale: 0.7, filter: 'blur(8px)'});
		typeWriter(msgs[i], function() {
			gsap.to(msgBox, {duration: 2.5, opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out'});
			setTimeout(function() {
				gsap.to(msgBox, {duration: 2.5, opacity: 0, scale: 0.7, filter: 'blur(8px)', ease: 'power2.in', onComplete: function() {
					i++;
					if (i < msgs.length) {
						setTimeout(showNext, 1000);
					} else {
						// بعد انتهاء الرسائل، غيّر الفيديو
						var vid = document.getElementById('bgVideo');
						vid.src = "12656_Big_Bang_1080.webm";
						vid.load();
						vid.play();
						// بعد الانفجار، أظهر رسالة الحب
						setTimeout(function() {
							msgBox.innerHTML = "BOBA";
							gsap.set(msgBox, {opacity: 0, scale: 0.7, filter: 'blur(8px)'});
							gsap.to(msgBox, {duration: 2.5, opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'power2.out'});
							// بعد 6 ثواني من ظهور BOBA، أخفيها ونفذ باقي الكود
							setTimeout(function() {
								gsap.to(msgBox, {duration: 2.5, opacity: 0, scale: 0.7, filter: 'blur(8px)', ease: 'power2.in'});
								// إيقاف الأغنية
								var audio = document.getElementById('bgAudio');
								if (audio) {
									audio.pause();
									audio.currentTime = 0;
								}
								// تشغيل الخلفية الجديدة loop-center
								var vid = document.getElementById('bgVideo');
								if (vid) {
									vid.src = "loop-center.mp4";
									vid.type = "video/mp4";
									vid.style.display = '';
									vid.load();
									vid.play();
								}
							}, 6000);
						}, 6000); // 6 ثواني بعد الانفجار
					}
				}});
			}, i === msgs.length-1 ? 9000 : 7000);
		});
	}
	showNext();
}

window.addEventListener('DOMContentLoaded', function() {
	// ...existing code...
	showStoryMessages(storyMessages);
});
// رسالة ترحيب تظهر وتختفي تدريجياً
window.addEventListener('DOMContentLoaded', function() {
	var msg = document.getElementById('welcomeMsg');
	gsap.to(msg, {duration: 1.5, opacity: 1, scale: 1, ease: 'power2.out'});
	setTimeout(function() {
		gsap.to(msg, {duration: 1.5, opacity: 0, scale: 0.7, ease: 'power2.in'});
	}, 2500);
});

// لتغيير الفيديو الخلفية، استخدم الفيديو المحلي
document.getElementById('bgVideo').src = "بوبا.mp4";

// لتغيير الأغنية، استخدم ملف mp3 المحلي
document.getElementById('bgAudio').src = "بوبا.mp3";

// تشغيل الأغنية تلقائيًا عند فتح الموقع، وإجبار التشغيل عند أي تفاعل إذا فشل
window.addEventListener('DOMContentLoaded', function() {
	var audio = document.getElementById('bgAudio');
	audio.volume = 0.7;
	audio.play();
});
