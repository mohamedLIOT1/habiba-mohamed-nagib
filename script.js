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
						vid.src = "https://drive.google.com/uc?export=download&id=1GOV079o0Kq0EEaK_9-FjpjUGGb9biAjX";
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
									vid.src = "https://drive.google.com/uc?export=download&id=1nADCYdQQAMrHvFHGWmjWS1-W9P5vzvQQ";
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
document.getElementById('bgAudio').src = "https://drive.google.com/uc?export=download&id=1jAyXPU17LQ7eyGB0cFf8AfeYvDlHdGEU";

// تشغيل الأغنية تلقائيًا عند فتح الموقع، وإجبار التشغيل عند أي تفاعل إذا فشل
window.addEventListener('DOMContentLoaded', function() {
	var audio = document.getElementById('bgAudio');
	var errorMsg = document.getElementById('audioErrorMsg');
	audio.volume = 0.7;

	// Diagnostic logs
	console.log('[audio] src=', audio.src);
	audio.addEventListener('play', function() { console.log('[audio] play event fired'); });
	audio.addEventListener('playing', function() { console.log('[audio] playing'); });
	audio.addEventListener('pause', function() { console.log('[audio] paused'); });
	audio.addEventListener('error', function(e) {
		console.error('[audio] error', e);
	showAudioError('خطأ في تحميل ملف الصوت. تحقق من وجود الصوت وصلاحيات الوصول (Console for details).');
	});

	function showAudioError(msg) {
		if (errorMsg) {
			errorMsg.innerHTML = '⚠️ ' + msg;
			errorMsg.style.display = 'block';
		} else {
			alert(msg);
		}
	}

	function tryPlay() {
		console.log('[audio] attempt play');
		var playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise.then(function() { console.log('[audio] autoplay succeeded'); }).catch(function(err) {
				console.warn('[audio] autoplay failed:', err);
				// If autoplay failed, test fetching the file to see if it's reachable
				fetch(audio.src, { method: 'HEAD' }).then(function(resp) {
					console.log('[fetch head] status=', resp.status);
					if (!resp.ok) {
						showAudioError('ملف الصوت غير متاح (HTTP ' + resp.status + '). تأكد من وجود الصوت أو صلاحيات السيرفر.');
					} else {
						showAudioError('التشغيل التلقائي ممنوع من المتصفح؛ اضغط في أي مكان لبدء التشغيل.');
						// play on first user interaction
						var forcePlay = function() {
							audio.play().then(function(){ console.log('[audio] play after interaction success'); errorMsg.style.display = 'none'; }).catch(function(e){ console.error('[audio] play after interaction failed', e); });
							document.removeEventListener('click', forcePlay);
							document.removeEventListener('touchstart', forcePlay);
							document.removeEventListener('scroll', forcePlay);
						};
						document.addEventListener('click', forcePlay);
						document.addEventListener('touchstart', forcePlay);
						document.addEventListener('scroll', forcePlay);
					}
				}).catch(function(fetchErr) {
					console.error('[fetch head] error', fetchErr);
					showAudioError('فشل الوصول إلى ملف الصوت. تأكد من أن الملف في نفس المجلد وأنه يمكن الوصول إليه.');
				});
			});
		}
	}

	tryPlay();
});
