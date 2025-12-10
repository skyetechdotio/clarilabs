import type { LanguageCode } from '../context/LanguageContext';

// Test name translations
export const testNameTranslations: Record<string, Record<LanguageCode, string>> = {
  // CBC
  'wbc': {
    en: 'White Blood Cell Count',
    es: 'Recuento de Glóbulos Blancos',
    zh: '白细胞计数',
    vi: 'Số Lượng Bạch Cầu',
    tl: 'Bilang ng White Blood Cell',
    ko: '백혈구 수',
    ar: 'عدد خلايا الدم البيضاء',
    ru: 'Количество Лейкоцитов',
  },
  'rbc': {
    en: 'Red Blood Cell Count',
    es: 'Recuento de Glóbulos Rojos',
    zh: '红细胞计数',
    vi: 'Số Lượng Hồng Cầu',
    tl: 'Bilang ng Red Blood Cell',
    ko: '적혈구 수',
    ar: 'عدد خلايا الدم الحمراء',
    ru: 'Количество Эритроцитов',
  },
  'hemoglobin': {
    en: 'Hemoglobin',
    es: 'Hemoglobina',
    zh: '血红蛋白',
    vi: 'Hemoglobin',
    tl: 'Hemoglobin',
    ko: '헤모글로빈',
    ar: 'الهيموجلوبين',
    ru: 'Гемоглобин',
  },
  'hematocrit': {
    en: 'Hematocrit',
    es: 'Hematocrito',
    zh: '红细胞压积',
    vi: 'Hematocrit',
    tl: 'Hematocrit',
    ko: '적혈구용적률',
    ar: 'الهيماتوكريت',
    ru: 'Гематокрит',
  },
  'mcv': {
    en: 'Mean Corpuscular Volume',
    es: 'Volumen Corpuscular Medio',
    zh: '平均红细胞体积',
    vi: 'Thể Tích Hồng Cầu Trung Bình',
    tl: 'Mean Corpuscular Volume',
    ko: '평균적혈구용적',
    ar: 'متوسط حجم الكرية',
    ru: 'Средний Объём Эритроцита',
  },
  'platelets': {
    en: 'Platelet Count',
    es: 'Recuento de Plaquetas',
    zh: '血小板计数',
    vi: 'Số Lượng Tiểu Cầu',
    tl: 'Bilang ng Platelet',
    ko: '혈소판 수',
    ar: 'عدد الصفائح الدموية',
    ru: 'Количество Тромбоцитов',
  },
  // CMP
  'glucose': {
    en: 'Glucose, Fasting',
    es: 'Glucosa en Ayunas',
    zh: '空腹血糖',
    vi: 'Đường Huyết Lúc Đói',
    tl: 'Glucose, Fasting',
    ko: '공복 혈당',
    ar: 'الجلوكوز الصائم',
    ru: 'Глюкоза Натощак',
  },
  'bun': {
    en: 'Blood Urea Nitrogen',
    es: 'Nitrógeno Ureico en Sangre',
    zh: '血尿素氮',
    vi: 'Nitơ Urê Máu',
    tl: 'Blood Urea Nitrogen',
    ko: '혈중 요소 질소',
    ar: 'نيتروجين يوريا الدم',
    ru: 'Азот Мочевины Крови',
  },
  'creatinine': {
    en: 'Creatinine',
    es: 'Creatinina',
    zh: '肌酐',
    vi: 'Creatinine',
    tl: 'Creatinine',
    ko: '크레아티닌',
    ar: 'الكرياتينين',
    ru: 'Креатинин',
  },
  'sodium': {
    en: 'Sodium',
    es: 'Sodio',
    zh: '钠',
    vi: 'Natri',
    tl: 'Sodium',
    ko: '나트륨',
    ar: 'الصوديوم',
    ru: 'Натрий',
  },
  'potassium': {
    en: 'Potassium',
    es: 'Potasio',
    zh: '钾',
    vi: 'Kali',
    tl: 'Potassium',
    ko: '칼륨',
    ar: 'البوتاسيوم',
    ru: 'Калий',
  },
  'co2': {
    en: 'Carbon Dioxide',
    es: 'Dióxido de Carbono',
    zh: '二氧化碳',
    vi: 'Carbon Dioxide',
    tl: 'Carbon Dioxide',
    ko: '이산화탄소',
    ar: 'ثاني أكسيد الكربون',
    ru: 'Углекислый Газ',
  },
  'calcium': {
    en: 'Calcium',
    es: 'Calcio',
    zh: '钙',
    vi: 'Canxi',
    tl: 'Calcium',
    ko: '칼슘',
    ar: 'الكالسيوم',
    ru: 'Кальций',
  },
  'alt': {
    en: 'Alanine Aminotransferase',
    es: 'Alanina Aminotransferasa',
    zh: '丙氨酸转氨酶',
    vi: 'Alanine Aminotransferase',
    tl: 'Alanine Aminotransferase',
    ko: '알라닌 아미노전이효소',
    ar: 'ألانين أمينوترانسفيراز',
    ru: 'Аланинаминотрансфераза',
  },
  'ast': {
    en: 'Aspartate Aminotransferase',
    es: 'Aspartato Aminotransferasa',
    zh: '天冬氨酸转氨酶',
    vi: 'Aspartate Aminotransferase',
    tl: 'Aspartate Aminotransferase',
    ko: '아스파르테이트 아미노전이효소',
    ar: 'أسبارتات أمينوترانسفيراز',
    ru: 'Аспартатаминотрансфераза',
  },
  // Lipid Panel
  'cholesterol-total': {
    en: 'Total Cholesterol',
    es: 'Colesterol Total',
    zh: '总胆固醇',
    vi: 'Cholesterol Toàn Phần',
    tl: 'Total Cholesterol',
    ko: '총 콜레스테롤',
    ar: 'الكوليسترول الكلي',
    ru: 'Общий Холестерин',
  },
  'ldl': {
    en: 'LDL Cholesterol',
    es: 'Colesterol LDL',
    zh: '低密度脂蛋白胆固醇',
    vi: 'Cholesterol LDL',
    tl: 'LDL Cholesterol',
    ko: 'LDL 콜레스테롤',
    ar: 'كوليسترول LDL',
    ru: 'Холестерин ЛПНП',
  },
  'hdl': {
    en: 'HDL Cholesterol',
    es: 'Colesterol HDL',
    zh: '高密度脂蛋白胆固醇',
    vi: 'Cholesterol HDL',
    tl: 'HDL Cholesterol',
    ko: 'HDL 콜레스테롤',
    ar: 'كوليسترول HDL',
    ru: 'Холестерин ЛПВП',
  },
  'triglycerides': {
    en: 'Triglycerides',
    es: 'Triglicéridos',
    zh: '甘油三酯',
    vi: 'Triglyceride',
    tl: 'Triglycerides',
    ko: '중성지방',
    ar: 'الدهون الثلاثية',
    ru: 'Триглицериды',
  },
  // Thyroid
  'tsh': {
    en: 'Thyroid Stimulating Hormone',
    es: 'Hormona Estimulante de la Tiroides',
    zh: '促甲状腺激素',
    vi: 'Hormone Kích Thích Tuyến Giáp',
    tl: 'Thyroid Stimulating Hormone',
    ko: '갑상선 자극 호르몬',
    ar: 'هرمون تحفيز الغدة الدرقية',
    ru: 'Тиреотропный Гормон',
  },
  'free-t4': {
    en: 'Free T4',
    es: 'T4 Libre',
    zh: '游离T4',
    vi: 'T4 Tự Do',
    tl: 'Free T4',
    ko: '유리 T4',
    ar: 'T4 الحر',
    ru: 'Свободный Т4',
  },
  // Vitamins
  'vitamin-d': {
    en: 'Vitamin D, 25-Hydroxy',
    es: 'Vitamina D, 25-Hidroxi',
    zh: '25-羟基维生素D',
    vi: 'Vitamin D, 25-Hydroxy',
    tl: 'Vitamin D, 25-Hydroxy',
    ko: '비타민 D, 25-하이드록시',
    ar: 'فيتامين د، 25-هيدروكسي',
    ru: 'Витамин D, 25-Гидрокси',
  },
};

// Test description translations (short descriptions)
export const testDescriptionTranslations: Record<string, Record<LanguageCode, string>> = {
  'glucose': {
    en: 'Measures blood sugar levels after fasting.',
    es: 'Mide los niveles de azúcar en sangre después del ayuno.',
    zh: '测量空腹后的血糖水平。',
    vi: 'Đo lường nồng độ đường trong máu sau khi nhịn ăn.',
    tl: 'Sinusukat ang antas ng asukal sa dugo pagkatapos ng pag-aayuno.',
    ko: '공복 후 혈당 수치를 측정합니다.',
    ar: 'يقيس مستويات السكر في الدم بعد الصيام.',
    ru: 'Измеряет уровень сахара в крови натощак.',
  },
  'bun': {
    en: 'Measures how well your kidneys are working.',
    es: 'Mide qué tan bien funcionan sus riñones.',
    zh: '测量您的肾脏功能。',
    vi: 'Đo lường chức năng thận của bạn.',
    tl: 'Sinusukat kung gaano kahusay ang paggana ng iyong mga bato.',
    ko: '신장이 얼마나 잘 기능하는지 측정합니다.',
    ar: 'يقيس مدى كفاءة عمل الكلى.',
    ru: 'Измеряет, насколько хорошо работают ваши почки.',
  },
  'cholesterol-total': {
    en: 'The total amount of cholesterol in your blood.',
    es: 'La cantidad total de colesterol en su sangre.',
    zh: '血液中的总胆固醇量。',
    vi: 'Tổng lượng cholesterol trong máu của bạn.',
    tl: 'Ang kabuuang dami ng cholesterol sa iyong dugo.',
    ko: '혈액 내 총 콜레스테롤 양.',
    ar: 'إجمالي كمية الكوليسترول في دمك.',
    ru: 'Общее количество холестерина в крови.',
  },
  'ldl': {
    en: '"Bad" cholesterol that can build up in arteries.',
    es: 'Colesterol "malo" que puede acumularse en las arterias.',
    zh: '"坏"胆固醇，可能在动脉中积聚。',
    vi: 'Cholesterol "xấu" có thể tích tụ trong động mạch.',
    tl: '"Masamang" cholesterol na maaaring mag-ipon sa mga arterya.',
    ko: '동맥에 축적될 수 있는 "나쁜" 콜레스테롤.',
    ar: 'الكوليسترول "الضار" الذي يمكن أن يتراكم في الشرايين.',
    ru: '«Плохой» холестерин, который может накапливаться в артериях.',
  },
  'tsh': {
    en: 'Controls thyroid hormone production.',
    es: 'Controla la producción de hormona tiroidea.',
    zh: '控制甲状腺激素的产生。',
    vi: 'Kiểm soát việc sản xuất hormone tuyến giáp.',
    tl: 'Kinokontrol ang produksyon ng thyroid hormone.',
    ko: '갑상선 호르몬 생산을 조절합니다.',
    ar: 'يتحكم في إنتاج هرمون الغدة الدرقية.',
    ru: 'Контролирует выработку гормонов щитовидной железы.',
  },
  'vitamin-d': {
    en: 'Essential for bone health and immune function.',
    es: 'Esencial para la salud ósea y la función inmunológica.',
    zh: '对骨骼健康和免疫功能至关重要。',
    vi: 'Cần thiết cho sức khỏe xương và chức năng miễn dịch.',
    tl: 'Mahalaga para sa kalusugan ng buto at immune function.',
    ko: '뼈 건강과 면역 기능에 필수적입니다.',
    ar: 'ضروري لصحة العظام ووظيفة المناعة.',
    ru: 'Необходим для здоровья костей и иммунной функции.',
  },
};

// Full explanation translations for flagged tests
export const testExplanationTranslations: Record<string, Record<LanguageCode, string>> = {
  'glucose': {
    en: `Your fasting glucose is slightly above the normal range (70-99 mg/dL). At 108, this falls into the 'pre-diabetic' range (100-125 mg/dL). This single reading doesn't diagnose diabetes.

Since this was part of your annual wellness check, your doctor may recommend:
• Retesting in 3-6 months
• Dietary modifications (reducing refined carbs)
• Increased physical activity

**No immediate action needed**, but worth discussing at your follow-up.`,
    es: `Su glucosa en ayunas está ligeramente por encima del rango normal (70-99 mg/dL). Con 108, esto cae en el rango de 'pre-diabetes' (100-125 mg/dL). Una sola lectura no diagnostica diabetes.

Como esto fue parte de su chequeo anual, su médico puede recomendar:
• Volver a realizar la prueba en 3-6 meses
• Modificaciones en la dieta (reducir carbohidratos refinados)
• Aumentar la actividad física

**No se necesita acción inmediata**, pero vale la pena discutirlo en su seguimiento.`,
    zh: `您的空腹血糖略高于正常范围（70-99 mg/dL）。108的数值属于"糖尿病前期"范围（100-125 mg/dL）。单次检测结果不能诊断糖尿病。

由于这是您年度健康检查的一部分，您的医生可能会建议：
• 3-6个月后复查
• 饮食调整（减少精制碳水化合物）
• 增加体力活动

**无需立即采取行动**，但值得在随访时讨论。`,
    vi: `Đường huyết lúc đói của bạn hơi cao hơn mức bình thường (70-99 mg/dL). Ở mức 108, điều này rơi vào phạm vi 'tiền tiểu đường' (100-125 mg/dL). Một kết quả đơn lẻ không chẩn đoán được bệnh tiểu đường.

Vì đây là một phần của kiểm tra sức khỏe hàng năm, bác sĩ có thể đề nghị:
• Xét nghiệm lại sau 3-6 tháng
• Điều chỉnh chế độ ăn (giảm carb tinh chế)
• Tăng hoạt động thể chất

**Không cần hành động ngay**, nhưng đáng để thảo luận trong lần tái khám.`,
    tl: `Ang iyong fasting glucose ay bahagyang mas mataas sa normal na range (70-99 mg/dL). Sa 108, ito ay nasa 'pre-diabetic' range (100-125 mg/dL). Ang isang reading ay hindi nag-diagnose ng diabetes.

Dahil ito ay bahagi ng iyong taunang wellness check, maaaring irekomenda ng iyong doktor:
• Muling pagsusuri sa 3-6 na buwan
• Mga pagbabago sa diyeta (bawasan ang refined carbs)
• Dagdagan ang pisikal na aktibidad

**Walang kailangang agarang aksyon**, ngunit karapat-dapat pag-usapan sa iyong follow-up.`,
    ko: `공복 혈당이 정상 범위(70-99 mg/dL)보다 약간 높습니다. 108은 '당뇨병 전단계' 범위(100-125 mg/dL)에 해당합니다. 한 번의 검사 결과만으로는 당뇨병을 진단할 수 없습니다.

이것이 연례 건강 검진의 일부였으므로, 의사가 권장할 수 있는 사항:
• 3-6개월 후 재검사
• 식단 조절 (정제 탄수화물 줄이기)
• 신체 활동 증가

**즉각적인 조치는 필요 없지만**, 추적 관찰 시 논의할 가치가 있습니다.`,
    ar: `مستوى الجلوكوز الصائم لديك أعلى قليلاً من المعدل الطبيعي (70-99 ملغ/ديسيلتر). عند 108، يقع هذا في نطاق "ما قبل السكري" (100-125 ملغ/ديسيلتر). قراءة واحدة لا تشخص مرض السكري.

نظرًا لأن هذا كان جزءًا من فحصك الصحي السنوي، قد يوصي طبيبك بـ:
• إعادة الاختبار خلال 3-6 أشهر
• تعديلات غذائية (تقليل الكربوهيدرات المكررة)
• زيادة النشاط البدني

**لا حاجة لاتخاذ إجراء فوري**، لكن يستحق المناقشة في متابعتك.`,
    ru: `Ваш уровень глюкозы натощак немного выше нормы (70-99 мг/дл). При 108 это попадает в диапазон «преддиабет» (100-125 мг/дл). Однократное измерение не является диагнозом диабета.

Поскольку это было частью вашего ежегодного осмотра, врач может порекомендовать:
• Повторный тест через 3-6 месяцев
• Изменения в питании (сокращение рафинированных углеводов)
• Увеличение физической активности

**Немедленных действий не требуется**, но стоит обсудить на следующем приёме.`,
  },
  'bun': {
    en: `Your Blood Urea Nitrogen is slightly above normal (7-20 mg/dL). This often indicates mild dehydration, especially if tested in the morning. Other causes include high-protein diet or strenuous exercise before the test.

Your creatinine is normal, which is reassuring for kidney function.

**Consider**: Ensure adequate hydration before future tests.`,
    es: `Su Nitrógeno Ureico en Sangre está ligeramente por encima de lo normal (7-20 mg/dL). Esto a menudo indica deshidratación leve, especialmente si se realizó la prueba por la mañana. Otras causas incluyen dieta alta en proteínas o ejercicio intenso antes de la prueba.

Su creatinina es normal, lo cual es tranquilizador para la función renal.

**Considere**: Asegurar una hidratación adecuada antes de futuras pruebas.`,
    zh: `您的血尿素氮略高于正常值（7-20 mg/dL）。这通常表示轻度脱水，特别是如果是在早上检测的话。其他原因包括高蛋白饮食或检测前的剧烈运动。

您的肌酐正常，这对肾功能来说是令人放心的。

**建议**：确保在未来检测前充分补水。`,
    vi: `Nitơ Urê Máu của bạn hơi cao hơn bình thường (7-20 mg/dL). Điều này thường cho thấy tình trạng mất nước nhẹ, đặc biệt nếu xét nghiệm vào buổi sáng. Các nguyên nhân khác bao gồm chế độ ăn giàu protein hoặc tập thể dục cường độ cao trước khi xét nghiệm.

Creatinine của bạn bình thường, đây là dấu hiệu tốt cho chức năng thận.

**Lưu ý**: Đảm bảo uống đủ nước trước các lần xét nghiệm trong tương lai.`,
    tl: `Ang iyong Blood Urea Nitrogen ay bahagyang mas mataas sa normal (7-20 mg/dL). Madalas itong nagpapahiwatig ng banayad na dehydration, lalo na kung sinubukan sa umaga. Ang iba pang sanhi ay kasama ang mataas na protina na diyeta o matinding ehersisyo bago ang pagsusuri.

Ang iyong creatinine ay normal, na nakapagpapatiwasay para sa function ng bato.

**Isaalang-alang**: Tiyaking sapat ang hydration bago ang mga susunod na pagsusuri.`,
    ko: `혈중 요소 질소가 정상(7-20 mg/dL)보다 약간 높습니다. 이는 종종 경미한 탈수를 나타내며, 특히 아침에 검사를 받은 경우 그렇습니다. 다른 원인으로는 고단백 식단이나 검사 전 격렬한 운동이 있습니다.

크레아티닌이 정상이므로 신장 기능에 대해 안심할 수 있습니다.

**고려사항**: 향후 검사 전에 충분한 수분 섭취를 확보하세요.`,
    ar: `نيتروجين يوريا الدم لديك أعلى قليلاً من الطبيعي (7-20 ملغ/ديسيلتر). هذا غالباً ما يشير إلى جفاف خفيف، خاصة إذا تم الاختبار في الصباح. الأسباب الأخرى تشمل نظام غذائي عالي البروتين أو ممارسة رياضة شاقة قبل الاختبار.

الكرياتينين لديك طبيعي، وهذا مطمئن لوظائف الكلى.

**فكر في**: ضمان الترطيب الكافي قبل الاختبارات المستقبلية.`,
    ru: `Ваш показатель азота мочевины крови немного выше нормы (7-20 мг/дл). Это часто указывает на лёгкое обезвоживание, особенно при утреннем анализе. Другие причины включают высокобелковую диету или интенсивные упражнения перед тестом.

Ваш креатинин в норме, что успокаивает относительно функции почек.

**Рекомендация**: Обеспечьте достаточное увлажнение перед будущими анализами.`,
  },
  'cholesterol-total': {
    en: `Your cholesterol levels are elevated. Total cholesterol ideally should be under 200 mg/dL, and yours is 218.

These numbers suggest increased cardiovascular risk over time. The good news: your HDL is acceptable and triglycerides are normal.

**Your doctor will likely discuss**: Diet modifications, exercise, and possibly statin therapy depending on other risk factors.`,
    es: `Sus niveles de colesterol están elevados. El colesterol total idealmente debería estar por debajo de 200 mg/dL, y el suyo es 218.

Estos números sugieren un mayor riesgo cardiovascular con el tiempo. La buena noticia: su HDL es aceptable y los triglicéridos son normales.

**Su médico probablemente discutirá**: Modificaciones en la dieta, ejercicio y posiblemente terapia con estatinas dependiendo de otros factores de riesgo.`,
    zh: `您的胆固醇水平偏高。理想情况下，总胆固醇应低于200 mg/dL，而您的是218。

这些数字表明随着时间推移心血管风险增加。好消息是：您的HDL可以接受，甘油三酯正常。

**您的医生可能会讨论**：饮食调整、运动，以及根据其他风险因素可能的他汀类药物治疗。`,
    vi: `Mức cholesterol của bạn cao. Cholesterol toàn phần lý tưởng nên dưới 200 mg/dL, và của bạn là 218.

Những con số này cho thấy nguy cơ tim mạch tăng theo thời gian. Tin tốt là: HDL của bạn ở mức chấp nhận được và triglyceride bình thường.

**Bác sĩ của bạn có thể sẽ thảo luận về**: Điều chỉnh chế độ ăn, tập thể dục, và có thể là liệu pháp statin tùy thuộc vào các yếu tố nguy cơ khác.`,
    tl: `Ang iyong mga antas ng cholesterol ay mataas. Ang total cholesterol ay dapat mas mababa sa 200 mg/dL, at ang sa iyo ay 218.

Ang mga numerong ito ay nagmumungkahi ng tumaas na cardiovascular risk sa paglipas ng panahon. Ang magandang balita: ang iyong HDL ay katanggap-tanggap at normal ang triglycerides.

**Malamang na tatalakayin ng iyong doktor**: Mga pagbabago sa diyeta, ehersisyo, at posibleng statin therapy depende sa ibang risk factors.`,
    ko: `콜레스테롤 수치가 높습니다. 총 콜레스테롤은 이상적으로 200 mg/dL 미만이어야 하는데, 귀하는 218입니다.

이 수치는 시간이 지남에 따라 심혈관 위험이 증가함을 시사합니다. 좋은 소식: HDL은 허용 범위이고 중성지방은 정상입니다.

**의사가 논의할 가능성이 있는 사항**: 식단 조절, 운동, 그리고 다른 위험 요인에 따라 스타틴 요법.`,
    ar: `مستويات الكوليسترول لديك مرتفعة. يجب أن يكون الكوليسترول الكلي أقل من 200 ملغ/ديسيلتر، ولديك 218.

هذه الأرقام تشير إلى زيادة خطر الإصابة بأمراض القلب والأوعية الدموية بمرور الوقت. الخبر الجيد: HDL لديك مقبول والدهون الثلاثية طبيعية.

**من المرجح أن يناقش طبيبك**: تعديلات النظام الغذائي والتمارين الرياضية وربما العلاج بالستاتين اعتماداً على عوامل الخطر الأخرى.`,
    ru: `Ваш уровень холестерина повышен. В идеале общий холестерин должен быть ниже 200 мг/дл, а у вас 218.

Эти показатели указывают на повышенный сердечно-сосудистый риск со временем. Хорошая новость: ваш ЛПВП в допустимых пределах, а триглицериды в норме.

**Врач, вероятно, обсудит**: Изменения в питании, физические упражнения и, возможно, терапию статинами в зависимости от других факторов риска.`,
  },
  'ldl': {
    en: `Your LDL ("bad") cholesterol is elevated at 142 mg/dL. The optimal level is under 100 mg/dL, with lower being better for heart health.

LDL is the primary focus for cardiovascular risk reduction. Elevated LDL over time can lead to plaque buildup in arteries.

**Typical recommendations include**:
• Heart-healthy diet (less saturated fat, more fiber)
• Regular exercise (150+ minutes per week)
• Weight management
• Medication if lifestyle changes aren't sufficient`,
    es: `Su colesterol LDL ("malo") está elevado en 142 mg/dL. El nivel óptimo es menos de 100 mg/dL, siendo más bajo mejor para la salud cardíaca.

El LDL es el enfoque principal para la reducción del riesgo cardiovascular. El LDL elevado con el tiempo puede llevar a la acumulación de placa en las arterias.

**Las recomendaciones típicas incluyen**:
• Dieta saludable para el corazón (menos grasa saturada, más fibra)
• Ejercicio regular (más de 150 minutos por semana)
• Control del peso
• Medicación si los cambios de estilo de vida no son suficientes`,
    zh: `您的LDL（"坏"）胆固醇升高，为142 mg/dL。最佳水平应低于100 mg/dL，越低对心脏健康越好。

LDL是降低心血管风险的主要关注点。长期LDL升高可导致动脉斑块堆积。

**典型建议包括**：
• 有益心脏的饮食（减少饱和脂肪，增加纤维）
• 定期运动（每周150分钟以上）
• 体重管理
• 如果生活方式改变不够，可能需要药物治疗`,
    vi: `Cholesterol LDL ("xấu") của bạn cao ở mức 142 mg/dL. Mức tối ưu là dưới 100 mg/dL, càng thấp càng tốt cho sức khỏe tim mạch.

LDL là trọng tâm chính để giảm nguy cơ tim mạch. LDL cao theo thời gian có thể dẫn đến tích tụ mảng bám trong động mạch.

**Các khuyến nghị điển hình bao gồm**:
• Chế độ ăn tốt cho tim (ít chất béo bão hòa, nhiều chất xơ)
• Tập thể dục thường xuyên (hơn 150 phút mỗi tuần)
• Quản lý cân nặng
• Thuốc nếu thay đổi lối sống không đủ`,
    tl: `Ang iyong LDL ("masamang") cholesterol ay mataas sa 142 mg/dL. Ang optimal na antas ay mas mababa sa 100 mg/dL, mas mababa mas mabuti para sa kalusugan ng puso.

Ang LDL ay ang pangunahing pokus para sa pagbawas ng cardiovascular risk. Ang mataas na LDL sa paglipas ng panahon ay maaaring humantong sa pagtitipon ng plaque sa mga arterya.

**Karaniwang mga rekomendasyon ay kinabibilangan ng**:
• Heart-healthy diet (mas kaunting saturated fat, mas maraming fiber)
• Regular na ehersisyo (150+ minuto bawat linggo)
• Pamamahala ng timbang
• Gamot kung hindi sapat ang mga pagbabago sa lifestyle`,
    ko: `LDL("나쁜") 콜레스테롤이 142 mg/dL로 높습니다. 최적 수치는 100 mg/dL 미만이며, 낮을수록 심장 건강에 좋습니다.

LDL은 심혈관 위험 감소를 위한 주요 초점입니다. 시간이 지남에 따라 높은 LDL은 동맥에 플라크 축적으로 이어질 수 있습니다.

**일반적인 권장 사항**:
• 심장 건강에 좋은 식단 (포화 지방 줄이기, 섬유질 늘리기)
• 규칙적인 운동 (주당 150분 이상)
• 체중 관리
• 생활습관 변화가 충분하지 않으면 약물 치료`,
    ar: `كوليسترول LDL ("الضار") لديك مرتفع عند 142 ملغ/ديسيلتر. المستوى المثالي أقل من 100 ملغ/ديسيلتر، وكلما انخفض كان أفضل لصحة القلب.

LDL هو التركيز الأساسي لتقليل مخاطر القلب والأوعية الدموية. ارتفاع LDL بمرور الوقت يمكن أن يؤدي إلى تراكم اللويحات في الشرايين.

**التوصيات النموذجية تشمل**:
• نظام غذائي صحي للقلب (أقل دهون مشبعة، المزيد من الألياف)
• تمارين منتظمة (150+ دقيقة أسبوعياً)
• إدارة الوزن
• الأدوية إذا لم تكن تغييرات نمط الحياة كافية`,
    ru: `Ваш ЛПНП («плохой») холестерин повышен — 142 мг/дл. Оптимальный уровень — ниже 100 мг/дл, чем ниже, тем лучше для здоровья сердца.

ЛПНП — главный фокус для снижения сердечно-сосудистого риска. Повышенный ЛПНП со временем может привести к образованию бляшек в артериях.

**Типичные рекомендации включают**:
• Полезное для сердца питание (меньше насыщенных жиров, больше клетчатки)
• Регулярные упражнения (150+ минут в неделю)
• Контроль веса
• Медикаменты, если изменений образа жизни недостаточно`,
  },
  'tsh': {
    en: `Your thyroid-stimulating hormone is slightly above the normal range (0.4-4.0 mIU/L). This can indicate your thyroid is working a bit harder than usual.

Since your Free T4 is normal, this may be 'subclinical hypothyroidism'—often monitored rather than treated immediately.

**Typical next steps**: Retest in 6-8 weeks to confirm the pattern. Symptoms like fatigue, weight changes, or feeling cold may be relevant to mention to your doctor.`,
    es: `Su hormona estimulante de la tiroides está ligeramente por encima del rango normal (0.4-4.0 mIU/L). Esto puede indicar que su tiroides está trabajando un poco más de lo normal.

Como su T4 libre es normal, esto puede ser 'hipotiroidismo subclínico'—a menudo se monitorea en lugar de tratarse inmediatamente.

**Próximos pasos típicos**: Volver a realizar la prueba en 6-8 semanas para confirmar el patrón. Síntomas como fatiga, cambios de peso o sensación de frío pueden ser relevantes para mencionar a su médico.`,
    zh: `您的促甲状腺激素略高于正常范围（0.4-4.0 mIU/L）。这可能表明您的甲状腺比平时工作得更努力。

由于您的游离T4正常，这可能是"亚临床甲状腺功能减退"——通常是监测而不是立即治疗。

**典型的下一步**：6-8周后复查以确认模式。疲劳、体重变化或感觉冷等症状可能值得向医生提及。`,
    vi: `Hormone kích thích tuyến giáp của bạn hơi cao hơn mức bình thường (0.4-4.0 mIU/L). Điều này có thể cho thấy tuyến giáp của bạn đang làm việc nhiều hơn bình thường.

Vì T4 tự do của bạn bình thường, đây có thể là 'suy giáp dưới lâm sàng'—thường được theo dõi thay vì điều trị ngay.

**Các bước tiếp theo điển hình**: Xét nghiệm lại sau 6-8 tuần để xác nhận mô hình. Các triệu chứng như mệt mỏi, thay đổi cân nặng, hoặc cảm thấy lạnh có thể đáng để đề cập với bác sĩ.`,
    tl: `Ang iyong thyroid-stimulating hormone ay bahagyang mas mataas sa normal na range (0.4-4.0 mIU/L). Maaaring ipahiwatig nito na ang iyong thyroid ay nagtatrabaho ng kaunti nang mas mahirap kaysa karaniwan.

Dahil normal ang iyong Free T4, maaaring ito ay 'subclinical hypothyroidism'—madalas na sinusubaybayan sa halip na agad na gamutin.

**Karaniwang mga susunod na hakbang**: Muling pagsusuri sa 6-8 linggo upang kumpirmahin ang pattern. Ang mga sintomas tulad ng pagkapagod, pagbabago sa timbang, o pakiramdam ng lamig ay maaaring may kaugnayan na banggitin sa iyong doktor.`,
    ko: `갑상선 자극 호르몬이 정상 범위(0.4-4.0 mIU/L)보다 약간 높습니다. 이는 갑상선이 평소보다 조금 더 열심히 일하고 있음을 나타낼 수 있습니다.

유리 T4가 정상이므로, 이는 '무증상 갑상선기능저하증'일 수 있습니다—보통 즉시 치료하기보다는 모니터링합니다.

**일반적인 다음 단계**: 6-8주 후에 재검사하여 패턴을 확인합니다. 피로, 체중 변화, 또는 추위를 느끼는 증상은 의사에게 언급할 가치가 있을 수 있습니다.`,
    ar: `هرمون تحفيز الغدة الدرقية لديك أعلى قليلاً من المعدل الطبيعي (0.4-4.0 وحدة دولية مللي/لتر). قد يشير هذا إلى أن غدتك الدرقية تعمل بجهد أكبر من المعتاد.

نظراً لأن T4 الحر لديك طبيعي، قد يكون هذا 'قصور الغدة الدرقية تحت السريري'—غالباً ما يتم مراقبته بدلاً من علاجه فوراً.

**الخطوات التالية النموذجية**: إعادة الاختبار خلال 6-8 أسابيع لتأكيد النمط. الأعراض مثل التعب أو تغيرات الوزن أو الشعور بالبرد قد تكون ذات صلة لذكرها لطبيبك.`,
    ru: `Ваш тиреотропный гормон немного выше нормы (0.4-4.0 мМЕ/л). Это может указывать на то, что ваша щитовидная железа работает немного интенсивнее обычного.

Поскольку ваш свободный Т4 в норме, это может быть «субклинический гипотиреоз» — часто наблюдается, а не лечится немедленно.

**Типичные следующие шаги**: Повторный анализ через 6-8 недель для подтверждения картины. Симптомы, такие как усталость, изменения веса или ощущение холода, могут быть важны для упоминания врачу.`,
  },
  'vitamin-d': {
    en: `Your Vitamin D level is below the optimal range (30-100 ng/mL). This is very common, especially in winter months or with limited sun exposure.

Low Vitamin D can affect bone health, mood, and immune function.

**Common recommendation**: Vitamin D3 supplementation (typically 1000-2000 IU daily). Your doctor can advise on the right dose for you.`,
    es: `Su nivel de Vitamina D está por debajo del rango óptimo (30-100 ng/mL). Esto es muy común, especialmente en los meses de invierno o con exposición limitada al sol.

La Vitamina D baja puede afectar la salud ósea, el estado de ánimo y la función inmunológica.

**Recomendación común**: Suplementación con Vitamina D3 (típicamente 1000-2000 UI diarias). Su médico puede aconsejarle sobre la dosis correcta para usted.`,
    zh: `您的维生素D水平低于最佳范围（30-100 ng/mL）。这很常见，特别是在冬季或阳光照射有限的情况下。

低维生素D会影响骨骼健康、情绪和免疫功能。

**常见建议**：补充维生素D3（通常每天1000-2000 IU）。您的医生可以为您建议合适的剂量。`,
    vi: `Mức Vitamin D của bạn thấp hơn phạm vi tối ưu (30-100 ng/mL). Điều này rất phổ biến, đặc biệt trong những tháng mùa đông hoặc khi tiếp xúc với ánh nắng mặt trời hạn chế.

Vitamin D thấp có thể ảnh hưởng đến sức khỏe xương, tâm trạng và chức năng miễn dịch.

**Khuyến nghị phổ biến**: Bổ sung Vitamin D3 (thường 1000-2000 IU mỗi ngày). Bác sĩ của bạn có thể tư vấn về liều lượng phù hợp cho bạn.`,
    tl: `Ang iyong antas ng Vitamin D ay mas mababa sa optimal na range (30-100 ng/mL). Ito ay napaka-karaniwan, lalo na sa mga buwan ng taglamig o may limitadong pagkakalantad sa araw.

Ang mababang Vitamin D ay maaaring makaapekto sa kalusugan ng buto, mood, at immune function.

**Karaniwang rekomendasyon**: Vitamin D3 supplementation (karaniwang 1000-2000 IU araw-araw). Maaaring magpayo ang iyong doktor sa tamang dosis para sa iyo.`,
    ko: `비타민 D 수치가 최적 범위(30-100 ng/mL) 미만입니다. 이는 특히 겨울철이나 햇빛 노출이 제한된 경우 매우 흔합니다.

낮은 비타민 D는 뼈 건강, 기분 및 면역 기능에 영향을 줄 수 있습니다.

**일반적인 권장 사항**: 비타민 D3 보충제 (일반적으로 매일 1000-2000 IU). 의사가 귀하에게 적합한 복용량을 조언해 줄 수 있습니다.`,
    ar: `مستوى فيتامين د لديك أقل من النطاق المثالي (30-100 نانوغرام/مل). هذا شائع جداً، خاصة في أشهر الشتاء أو مع التعرض المحدود للشمس.

انخفاض فيتامين د يمكن أن يؤثر على صحة العظام والمزاج ووظيفة المناعة.

**التوصية الشائعة**: مكملات فيتامين D3 (عادة 1000-2000 وحدة دولية يومياً). يمكن لطبيبك أن ينصحك بالجرعة المناسبة لك.`,
    ru: `Ваш уровень витамина D ниже оптимального диапазона (30-100 нг/мл). Это очень распространено, особенно в зимние месяцы или при ограниченном пребывании на солнце.

Низкий уровень витамина D может влиять на здоровье костей, настроение и иммунную функцию.

**Обычная рекомендация**: Приём витамина D3 (обычно 1000-2000 МЕ ежедневно). Ваш врач может посоветовать правильную дозу для вас.`,
  },
};

// Category name translations
export const categoryNameTranslations: Record<string, Record<LanguageCode, string>> = {
  'cbc': {
    en: 'Complete Blood Count',
    es: 'Hemograma Completo',
    zh: '全血细胞计数',
    vi: 'Công Thức Máu Toàn Phần',
    tl: 'Complete Blood Count',
    ko: '전혈구 검사',
    ar: 'تعداد الدم الكامل',
    ru: 'Общий Анализ Крови',
  },
  'cmp': {
    en: 'Comprehensive Metabolic Panel',
    es: 'Panel Metabólico Completo',
    zh: '综合代谢检查组合',
    vi: 'Xét Nghiệm Chuyển Hóa Toàn Diện',
    tl: 'Comprehensive Metabolic Panel',
    ko: '종합 대사 검사',
    ar: 'لوحة الأيض الشاملة',
    ru: 'Комплексная Метаболическая Панель',
  },
  'lipid': {
    en: 'Lipid Panel',
    es: 'Panel de Lípidos',
    zh: '血脂检查组合',
    vi: 'Xét Nghiệm Lipid',
    tl: 'Lipid Panel',
    ko: '지질 검사',
    ar: 'لوحة الدهون',
    ru: 'Липидная Панель',
  },
  'thyroid': {
    en: 'Thyroid Panel',
    es: 'Panel Tiroideo',
    zh: '甲状腺功能检查组合',
    vi: 'Xét Nghiệm Tuyến Giáp',
    tl: 'Thyroid Panel',
    ko: '갑상선 검사',
    ar: 'لوحة الغدة الدرقية',
    ru: 'Панель Щитовидной Железы',
  },
  'vitamins': {
    en: 'Vitamins & Nutrients',
    es: 'Vitaminas y Nutrientes',
    zh: '维生素和营养素',
    vi: 'Vitamin và Chất Dinh Dưỡng',
    tl: 'Vitamins at Nutrients',
    ko: '비타민 및 영양소',
    ar: 'الفيتامينات والمغذيات',
    ru: 'Витамины и Питательные Вещества',
  },
};
