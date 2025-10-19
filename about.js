// 1. الحصول على مراجع للعناصر باستخدام الـ ID
let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let mountains_front = document.getElementById('mountains_front');
let text = document.getElementById('text');
let btn = document.getElementById('btn');
let header = document.querySelector('header');
let sec = document.getElementById('sec');
let boat = document.getElementById('boat');
let mountain_last = document.getElementById('mountain_last');

// 2. دالة التمرير (Scrolling Function)
window.onscroll = function(){
    let value = window.scrollY;

    // 🌟 حركة العناصر (التحويل على محور Y)
    // كل قيمة مضروبة تحدد سرعة حركة الطبقة (Parallax Effect)
    
    // النجوم تتحرك أسرع
    stars.style.top = value * 1.05 + 'px';


    // القمر والعنوان يتحركان معاً بنفس السرعة والمحاذاة
    moon.style.top = value * 3 + 'px';
    text.style.top = value * 3 + 'px';
    // محاذاة أفقية: اجعل العنوان في منتصف الصفحة مثل القمر
    text.style.left = '50%';
    text.style.transform = 'translate(-50%, 140px)';

    // الجبال الخلفية تتحرك أبطأ
    mountains_behind.style.top = value * 0.5 + 'px';
    // الجبال الأمامية ثابتة (لتبدو قريبة جداً)
    mountains_front.style.top = value * 0 + 'px';
    
    // القارب يتحرك أفقياً (على محور X)
    boat.style.left = value * 2 + 'px'; 
    // القارب يتحرك رأسياً (على محور Y)
    boat.style.top = value * 0.2 + 'px';

    // الزر يتحرك لأسفل (فقط لتأثير بصري بسيط)
    btn.style.marginTop = value * 1.5 + 'px';


    // 🌅 التحول اللوني (Night to Day Transition)
    // التحول يحدث عندما تصل قيمة التمرير إلى 127 بكسل
    if(value >= 127){
        // تحويل الخلفية إلى تدرج لوني أفتح (النهار)
        sec.style.background = 'linear-gradient(#7597de, #7597de)'; 
    } else {
        // العودة إلى اللون الأصلي (الليل)
        sec.style.background = 'linear-gradient(#2b1055, #7597de)';
    }
}
