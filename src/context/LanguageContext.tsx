import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  testNameTranslations,
  testDescriptionTranslations,
  testExplanationTranslations,
  categoryNameTranslations
} from '../data/translations';

// Language options with flags for universal recognition
export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'vi', name: 'Vietnamese', flag: '🇻🇳', nativeName: 'Tiếng Việt' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭', nativeName: 'Tagalog' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
] as const;

export type LanguageCode = typeof languages[number]['code'];
export type Language = typeof languages[number];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isTranslating: boolean;
  setIsTranslating: (val: boolean) => void;
  targetLanguage: Language | null;
  setTargetLanguage: (lang: Language | null) => void;
  t: (key: string) => string;
  tTestName: (testId: string, fallback: string) => string;
  tTestDescription: (testId: string, fallback: string) => string;
  tTestExplanation: (testId: string, fallback: string) => string;
  tCategoryName: (categoryId: string, fallback: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Translations for all UI text
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Dashboard
    'dashboard.title': 'Your Lab Results',
    'dashboard.subtitle': 'Tests ordered for',
    'dashboard.summary.normal': 'tests in normal range',
    'dashboard.summary.review': 'items to discuss with your doctor',
    'dashboard.flagged.title': 'Items to Discuss',
    'dashboard.flagged.subtitle': 'These results may need attention',
    'dashboard.results.title': 'All Results',
    'dashboard.viewDetails': 'View details',

    // Provider sidebar
    'provider.title': 'Your Care Provider',
    'provider.nextAvailable': 'Next Available',
    'provider.scheduleFollowup': 'Schedule Follow-up',
    'provider.questions': 'Have questions about your results? Your care team is here to help.',
    'provider.sendMessage': 'Send Message',

    // Test detail
    'detail.backToResults': 'Back to Results',
    'detail.whatThisMeans': 'What This Means',
    'detail.historicalTrend': 'Historical Trend',
    'detail.noHistory': 'No previous results available for this test.',
    'detail.relatedTests': 'Related Tests',
    'detail.disclaimer': 'This information is for educational purposes only and should not replace professional medical advice.',

    // History page
    'history.title': 'Your Lab History',
    'history.selectTest': 'Select a test to view trends',
    'history.keyInsights': 'Key Insights',
    'history.noData': 'Select a test above to view historical trends',

    // Range indicators
    'range.low': 'Low',
    'range.normal': 'Normal',
    'range.high': 'High',
    'range.optimal': 'Optimal',
    'range.yourValue': 'Your value',

    // Status
    'status.normal': 'Normal',
    'status.elevated': 'Elevated',
    'status.low': 'Low',
    'status.critical': 'Critical',

    // Actions
    'action.share': 'Share',
    'action.translate': 'Translate',
    'action.aiTranslation': 'AI Translation',
    'action.selectLanguage': 'Select your preferred language',
    'action.translating': 'Translating...',

    // Loading
    'loading.step1.title': "We're here for you",
    'loading.step1.subtitle': 'Taking a moment to understand your results',
    'loading.step2.title': 'Making sense of the numbers',
    'loading.step2.subtitle': 'Translating medical data into clear insights',
    'loading.step3.title': 'Organizing what matters',
    'loading.step3.subtitle': "Highlighting what's important for you to know",
    'loading.step4.title': 'Preparing your personalized guide',
    'loading.step4.subtitle': 'Almost ready to walk you through everything',
    'loading.step5.title': 'All set!',
    'loading.step5.subtitle': 'Your results are ready to explore',
    'loading.secure': 'Your information is secure and private',
  },
  es: {
    // Dashboard
    'dashboard.title': 'Sus Resultados de Laboratorio',
    'dashboard.subtitle': 'Pruebas ordenadas para',
    'dashboard.summary.normal': 'pruebas en rango normal',
    'dashboard.summary.review': 'elementos para discutir con su médico',
    'dashboard.flagged.title': 'Elementos a Discutir',
    'dashboard.flagged.subtitle': 'Estos resultados pueden necesitar atención',
    'dashboard.results.title': 'Todos los Resultados',
    'dashboard.viewDetails': 'Ver detalles',

    // Provider sidebar
    'provider.title': 'Su Proveedor de Atención',
    'provider.nextAvailable': 'Próxima Disponibilidad',
    'provider.scheduleFollowup': 'Programar Seguimiento',
    'provider.questions': '¿Tiene preguntas sobre sus resultados? Su equipo de atención está aquí para ayudar.',
    'provider.sendMessage': 'Enviar Mensaje',

    // Test detail
    'detail.backToResults': 'Volver a Resultados',
    'detail.whatThisMeans': 'Qué Significa Esto',
    'detail.historicalTrend': 'Tendencia Histórica',
    'detail.noHistory': 'No hay resultados anteriores disponibles para esta prueba.',
    'detail.relatedTests': 'Pruebas Relacionadas',
    'detail.disclaimer': 'Esta información es solo para fines educativos y no debe reemplazar el consejo médico profesional.',

    // History page
    'history.title': 'Su Historial de Laboratorio',
    'history.selectTest': 'Seleccione una prueba para ver tendencias',
    'history.keyInsights': 'Información Clave',
    'history.noData': 'Seleccione una prueba arriba para ver tendencias históricas',

    // Range indicators
    'range.low': 'Bajo',
    'range.normal': 'Normal',
    'range.high': 'Alto',
    'range.optimal': 'Óptimo',
    'range.yourValue': 'Su valor',

    // Status
    'status.normal': 'Normal',
    'status.elevated': 'Elevado',
    'status.low': 'Bajo',
    'status.critical': 'Crítico',

    // Actions
    'action.share': 'Compartir',
    'action.translate': 'Traducir',
    'action.aiTranslation': 'Traducción IA',
    'action.selectLanguage': 'Seleccione su idioma preferido',
    'action.translating': 'Traduciendo...',

    // Loading
    'loading.step1.title': 'Estamos aquí para usted',
    'loading.step1.subtitle': 'Tomando un momento para entender sus resultados',
    'loading.step2.title': 'Dando sentido a los números',
    'loading.step2.subtitle': 'Traduciendo datos médicos en información clara',
    'loading.step3.title': 'Organizando lo que importa',
    'loading.step3.subtitle': 'Destacando lo que es importante que sepa',
    'loading.step4.title': 'Preparando su guía personalizada',
    'loading.step4.subtitle': 'Casi listo para guiarle a través de todo',
    'loading.step5.title': '¡Todo listo!',
    'loading.step5.subtitle': 'Sus resultados están listos para explorar',
    'loading.secure': 'Su información es segura y privada',
  },
  zh: {
    // Dashboard
    'dashboard.title': '您的化验结果',
    'dashboard.subtitle': '检测项目',
    'dashboard.summary.normal': '项检测在正常范围内',
    'dashboard.summary.review': '项需要与医生讨论',
    'dashboard.flagged.title': '需要讨论的项目',
    'dashboard.flagged.subtitle': '这些结果可能需要关注',
    'dashboard.results.title': '所有结果',
    'dashboard.viewDetails': '查看详情',

    // Provider sidebar
    'provider.title': '您的医疗服务提供者',
    'provider.nextAvailable': '下次可预约时间',
    'provider.scheduleFollowup': '预约随访',
    'provider.questions': '对您的结果有疑问？我们的医疗团队随时为您服务。',
    'provider.sendMessage': '发送消息',

    // Test detail
    'detail.backToResults': '返回结果',
    'detail.whatThisMeans': '这意味着什么',
    'detail.historicalTrend': '历史趋势',
    'detail.noHistory': '此检测没有之前的结果。',
    'detail.relatedTests': '相关检测',
    'detail.disclaimer': '此信息仅供教育目的，不应替代专业医疗建议。',

    // History page
    'history.title': '您的化验历史',
    'history.selectTest': '选择一项检测以查看趋势',
    'history.keyInsights': '关键见解',
    'history.noData': '请在上方选择一项检测以查看历史趋势',

    // Range indicators
    'range.low': '偏低',
    'range.normal': '正常',
    'range.high': '偏高',
    'range.optimal': '最佳',
    'range.yourValue': '您的数值',

    // Status
    'status.normal': '正常',
    'status.elevated': '偏高',
    'status.low': '偏低',
    'status.critical': '危急',

    // Actions
    'action.share': '分享',
    'action.translate': '翻译',
    'action.aiTranslation': 'AI翻译',
    'action.selectLanguage': '选择您的首选语言',
    'action.translating': '翻译中...',

    // Loading
    'loading.step1.title': '我们在这里为您服务',
    'loading.step1.subtitle': '花一点时间理解您的结果',
    'loading.step2.title': '理解这些数字',
    'loading.step2.subtitle': '将医学数据转化为清晰的见解',
    'loading.step3.title': '整理重要信息',
    'loading.step3.subtitle': '突出您需要了解的重要内容',
    'loading.step4.title': '准备您的个性化指南',
    'loading.step4.subtitle': '即将为您详细解读一切',
    'loading.step5.title': '准备就绪！',
    'loading.step5.subtitle': '您的结果已准备好供您查看',
    'loading.secure': '您的信息安全且私密',
  },
  vi: {
    // Dashboard
    'dashboard.title': 'Kết Quả Xét Nghiệm Của Bạn',
    'dashboard.subtitle': 'Xét nghiệm được yêu cầu cho',
    'dashboard.summary.normal': 'xét nghiệm trong phạm vi bình thường',
    'dashboard.summary.review': 'mục cần thảo luận với bác sĩ',
    'dashboard.flagged.title': 'Các Mục Cần Thảo Luận',
    'dashboard.flagged.subtitle': 'Các kết quả này có thể cần chú ý',
    'dashboard.results.title': 'Tất Cả Kết Quả',
    'dashboard.viewDetails': 'Xem chi tiết',

    // Provider sidebar
    'provider.title': 'Nhà Cung Cấp Dịch Vụ Y Tế',
    'provider.nextAvailable': 'Lịch Hẹn Tiếp Theo',
    'provider.scheduleFollowup': 'Đặt Lịch Tái Khám',
    'provider.questions': 'Bạn có câu hỏi về kết quả? Đội ngũ chăm sóc sẵn sàng hỗ trợ bạn.',
    'provider.sendMessage': 'Gửi Tin Nhắn',

    // Test detail
    'detail.backToResults': 'Quay Lại Kết Quả',
    'detail.whatThisMeans': 'Điều Này Có Nghĩa Gì',
    'detail.historicalTrend': 'Xu Hướng Lịch Sử',
    'detail.noHistory': 'Không có kết quả trước đó cho xét nghiệm này.',
    'detail.relatedTests': 'Xét Nghiệm Liên Quan',
    'detail.disclaimer': 'Thông tin này chỉ dành cho mục đích giáo dục và không nên thay thế lời khuyên y tế chuyên nghiệp.',

    // History page
    'history.title': 'Lịch Sử Xét Nghiệm',
    'history.selectTest': 'Chọn một xét nghiệm để xem xu hướng',
    'history.keyInsights': 'Thông Tin Quan Trọng',
    'history.noData': 'Chọn một xét nghiệm ở trên để xem xu hướng lịch sử',

    // Range indicators
    'range.low': 'Thấp',
    'range.normal': 'Bình thường',
    'range.high': 'Cao',
    'range.optimal': 'Tối ưu',
    'range.yourValue': 'Giá trị của bạn',

    // Status
    'status.normal': 'Bình thường',
    'status.elevated': 'Cao',
    'status.low': 'Thấp',
    'status.critical': 'Nguy cấp',

    // Actions
    'action.share': 'Chia sẻ',
    'action.translate': 'Dịch',
    'action.aiTranslation': 'Dịch bằng AI',
    'action.selectLanguage': 'Chọn ngôn ngữ ưa thích',
    'action.translating': 'Đang dịch...',

    // Loading
    'loading.step1.title': 'Chúng tôi ở đây vì bạn',
    'loading.step1.subtitle': 'Dành một chút thời gian để hiểu kết quả của bạn',
    'loading.step2.title': 'Phân tích các con số',
    'loading.step2.subtitle': 'Chuyển đổi dữ liệu y tế thành thông tin rõ ràng',
    'loading.step3.title': 'Sắp xếp những gì quan trọng',
    'loading.step3.subtitle': 'Làm nổi bật những gì bạn cần biết',
    'loading.step4.title': 'Chuẩn bị hướng dẫn cá nhân',
    'loading.step4.subtitle': 'Sắp sẵn sàng hướng dẫn bạn qua mọi thứ',
    'loading.step5.title': 'Hoàn tất!',
    'loading.step5.subtitle': 'Kết quả của bạn đã sẵn sàng để xem',
    'loading.secure': 'Thông tin của bạn được bảo mật và riêng tư',
  },
  tl: {
    // Dashboard
    'dashboard.title': 'Mga Resulta ng Iyong Lab',
    'dashboard.subtitle': 'Mga test na inorder para sa',
    'dashboard.summary.normal': 'test sa normal na range',
    'dashboard.summary.review': 'mga item na pag-uusapan sa iyong doktor',
    'dashboard.flagged.title': 'Mga Item na Dapat Pag-usapan',
    'dashboard.flagged.subtitle': 'Ang mga resultang ito ay maaaring mangailangan ng atensyon',
    'dashboard.results.title': 'Lahat ng Resulta',
    'dashboard.viewDetails': 'Tingnan ang detalye',

    // Provider sidebar
    'provider.title': 'Ang Iyong Care Provider',
    'provider.nextAvailable': 'Susunod na Available',
    'provider.scheduleFollowup': 'Mag-iskedyul ng Follow-up',
    'provider.questions': 'May mga katanungan tungkol sa iyong resulta? Naririto ang iyong care team para tumulong.',
    'provider.sendMessage': 'Magpadala ng Mensahe',

    // Test detail
    'detail.backToResults': 'Bumalik sa Resulta',
    'detail.whatThisMeans': 'Ano ang Ibig Sabihin Nito',
    'detail.historicalTrend': 'Kasaysayang Trend',
    'detail.noHistory': 'Walang nakaraang resulta para sa test na ito.',
    'detail.relatedTests': 'Mga Kaugnay na Test',
    'detail.disclaimer': 'Ang impormasyong ito ay para sa layuning pang-edukasyon lamang at hindi dapat palitan ang propesyonal na medikal na payo.',

    // History page
    'history.title': 'Kasaysayan ng Iyong Lab',
    'history.selectTest': 'Pumili ng test para makita ang mga trend',
    'history.keyInsights': 'Mahahalagang Insight',
    'history.noData': 'Pumili ng test sa itaas para makita ang mga historical trend',

    // Range indicators
    'range.low': 'Mababa',
    'range.normal': 'Normal',
    'range.high': 'Mataas',
    'range.optimal': 'Pinakamainam',
    'range.yourValue': 'Ang iyong value',

    // Status
    'status.normal': 'Normal',
    'status.elevated': 'Mataas',
    'status.low': 'Mababa',
    'status.critical': 'Kritikal',

    // Actions
    'action.share': 'I-share',
    'action.translate': 'I-translate',
    'action.aiTranslation': 'AI Translation',
    'action.selectLanguage': 'Piliin ang iyong gustong wika',
    'action.translating': 'Nagte-translate...',

    // Loading
    'loading.step1.title': 'Naririto kami para sa iyo',
    'loading.step1.subtitle': 'Naglalaan ng sandali para maintindihan ang iyong resulta',
    'loading.step2.title': 'Inuunawa ang mga numero',
    'loading.step2.subtitle': 'Isinasalin ang medikal na data sa malinaw na impormasyon',
    'loading.step3.title': 'Inoorganisa ang mahalaga',
    'loading.step3.subtitle': 'Itinatampok ang mga bagay na kailangan mong malaman',
    'loading.step4.title': 'Inihahanda ang iyong personal na gabay',
    'loading.step4.subtitle': 'Halos handa na para ipaliwanag ang lahat',
    'loading.step5.title': 'Handa na!',
    'loading.step5.subtitle': 'Ang iyong resulta ay handa nang i-explore',
    'loading.secure': 'Ang iyong impormasyon ay ligtas at pribado',
  },
  ko: {
    // Dashboard
    'dashboard.title': '검사 결과',
    'dashboard.subtitle': '검사 의뢰 대상',
    'dashboard.summary.normal': '개 검사가 정상 범위',
    'dashboard.summary.review': '개 항목을 의사와 상담 필요',
    'dashboard.flagged.title': '상담 필요 항목',
    'dashboard.flagged.subtitle': '이 결과들은 주의가 필요할 수 있습니다',
    'dashboard.results.title': '전체 결과',
    'dashboard.viewDetails': '상세 보기',

    // Provider sidebar
    'provider.title': '담당 의료진',
    'provider.nextAvailable': '다음 예약 가능일',
    'provider.scheduleFollowup': '추적 검사 예약',
    'provider.questions': '결과에 대해 궁금한 점이 있으신가요? 의료진이 도움을 드립니다.',
    'provider.sendMessage': '메시지 보내기',

    // Test detail
    'detail.backToResults': '결과로 돌아가기',
    'detail.whatThisMeans': '이것이 의미하는 것',
    'detail.historicalTrend': '과거 추이',
    'detail.noHistory': '이 검사에 대한 이전 결과가 없습니다.',
    'detail.relatedTests': '관련 검사',
    'detail.disclaimer': '이 정보는 교육 목적으로만 제공되며 전문적인 의료 조언을 대체해서는 안 됩니다.',

    // History page
    'history.title': '검사 이력',
    'history.selectTest': '추이를 보려면 검사를 선택하세요',
    'history.keyInsights': '주요 인사이트',
    'history.noData': '위에서 검사를 선택하여 과거 추이를 확인하세요',

    // Range indicators
    'range.low': '낮음',
    'range.normal': '정상',
    'range.high': '높음',
    'range.optimal': '최적',
    'range.yourValue': '귀하의 수치',

    // Status
    'status.normal': '정상',
    'status.elevated': '높음',
    'status.low': '낮음',
    'status.critical': '위급',

    // Actions
    'action.share': '공유',
    'action.translate': '번역',
    'action.aiTranslation': 'AI 번역',
    'action.selectLanguage': '원하는 언어를 선택하세요',
    'action.translating': '번역 중...',

    // Loading
    'loading.step1.title': '저희가 함께합니다',
    'loading.step1.subtitle': '귀하의 결과를 이해하는 시간을 갖고 있습니다',
    'loading.step2.title': '숫자의 의미 파악',
    'loading.step2.subtitle': '의료 데이터를 명확한 정보로 변환',
    'loading.step3.title': '중요한 것 정리',
    'loading.step3.subtitle': '알아야 할 중요한 것들을 강조',
    'loading.step4.title': '맞춤 가이드 준비',
    'loading.step4.subtitle': '모든 것을 안내해 드릴 준비가 거의 되었습니다',
    'loading.step5.title': '준비 완료!',
    'loading.step5.subtitle': '결과를 확인할 준비가 되었습니다',
    'loading.secure': '귀하의 정보는 안전하고 비공개입니다',
  },
  ar: {
    // Dashboard
    'dashboard.title': 'نتائج التحاليل الخاصة بك',
    'dashboard.subtitle': 'الفحوصات المطلوبة لـ',
    'dashboard.summary.normal': 'فحوصات في النطاق الطبيعي',
    'dashboard.summary.review': 'بنود لمناقشتها مع طبيبك',
    'dashboard.flagged.title': 'بنود للمناقشة',
    'dashboard.flagged.subtitle': 'قد تحتاج هذه النتائج إلى اهتمام',
    'dashboard.results.title': 'جميع النتائج',
    'dashboard.viewDetails': 'عرض التفاصيل',

    // Provider sidebar
    'provider.title': 'مقدم الرعاية الصحية',
    'provider.nextAvailable': 'الموعد التالي المتاح',
    'provider.scheduleFollowup': 'جدولة موعد متابعة',
    'provider.questions': 'هل لديك أسئلة حول نتائجك؟ فريق الرعاية الخاص بك هنا للمساعدة.',
    'provider.sendMessage': 'إرسال رسالة',

    // Test detail
    'detail.backToResults': 'العودة إلى النتائج',
    'detail.whatThisMeans': 'ماذا يعني هذا',
    'detail.historicalTrend': 'الاتجاه التاريخي',
    'detail.noHistory': 'لا توجد نتائج سابقة لهذا الفحص.',
    'detail.relatedTests': 'الفحوصات ذات الصلة',
    'detail.disclaimer': 'هذه المعلومات للأغراض التعليمية فقط ولا ينبغي أن تحل محل المشورة الطبية المهنية.',

    // History page
    'history.title': 'سجل التحاليل الخاص بك',
    'history.selectTest': 'اختر فحصاً لعرض الاتجاهات',
    'history.keyInsights': 'رؤى رئيسية',
    'history.noData': 'اختر فحصاً أعلاه لعرض الاتجاهات التاريخية',

    // Range indicators
    'range.low': 'منخفض',
    'range.normal': 'طبيعي',
    'range.high': 'مرتفع',
    'range.optimal': 'مثالي',
    'range.yourValue': 'قيمتك',

    // Status
    'status.normal': 'طبيعي',
    'status.elevated': 'مرتفع',
    'status.low': 'منخفض',
    'status.critical': 'حرج',

    // Actions
    'action.share': 'مشاركة',
    'action.translate': 'ترجمة',
    'action.aiTranslation': 'ترجمة بالذكاء الاصطناعي',
    'action.selectLanguage': 'اختر لغتك المفضلة',
    'action.translating': 'جاري الترجمة...',

    // Loading
    'loading.step1.title': 'نحن هنا من أجلك',
    'loading.step1.subtitle': 'نأخذ لحظة لفهم نتائجك',
    'loading.step2.title': 'فهم الأرقام',
    'loading.step2.subtitle': 'ترجمة البيانات الطبية إلى رؤى واضحة',
    'loading.step3.title': 'تنظيم ما يهم',
    'loading.step3.subtitle': 'إبراز ما هو مهم لمعرفتك',
    'loading.step4.title': 'إعداد دليلك الشخصي',
    'loading.step4.subtitle': 'جاهزون تقريباً لشرح كل شيء',
    'loading.step5.title': 'كل شيء جاهز!',
    'loading.step5.subtitle': 'نتائجك جاهزة للاستكشاف',
    'loading.secure': 'معلوماتك آمنة وخاصة',
  },
  ru: {
    // Dashboard
    'dashboard.title': 'Ваши Результаты Анализов',
    'dashboard.subtitle': 'Анализы назначены для',
    'dashboard.summary.normal': 'анализов в норме',
    'dashboard.summary.review': 'пунктов для обсуждения с врачом',
    'dashboard.flagged.title': 'Требуют Внимания',
    'dashboard.flagged.subtitle': 'Эти результаты могут требовать внимания',
    'dashboard.results.title': 'Все Результаты',
    'dashboard.viewDetails': 'Подробнее',

    // Provider sidebar
    'provider.title': 'Ваш Лечащий Врач',
    'provider.nextAvailable': 'Ближайшая Запись',
    'provider.scheduleFollowup': 'Записаться на Приём',
    'provider.questions': 'Есть вопросы о результатах? Наша команда готова помочь.',
    'provider.sendMessage': 'Отправить Сообщение',

    // Test detail
    'detail.backToResults': 'Назад к Результатам',
    'detail.whatThisMeans': 'Что Это Означает',
    'detail.historicalTrend': 'Историческая Динамика',
    'detail.noHistory': 'Нет предыдущих результатов для этого анализа.',
    'detail.relatedTests': 'Связанные Анализы',
    'detail.disclaimer': 'Эта информация предназначена только для образовательных целей и не должна заменять профессиональную медицинскую консультацию.',

    // History page
    'history.title': 'История Анализов',
    'history.selectTest': 'Выберите анализ для просмотра динамики',
    'history.keyInsights': 'Ключевые Выводы',
    'history.noData': 'Выберите анализ выше для просмотра исторической динамики',

    // Range indicators
    'range.low': 'Низкий',
    'range.normal': 'Норма',
    'range.high': 'Высокий',
    'range.optimal': 'Оптимальный',
    'range.yourValue': 'Ваш показатель',

    // Status
    'status.normal': 'Норма',
    'status.elevated': 'Повышен',
    'status.low': 'Понижен',
    'status.critical': 'Критический',

    // Actions
    'action.share': 'Поделиться',
    'action.translate': 'Перевести',
    'action.aiTranslation': 'ИИ Перевод',
    'action.selectLanguage': 'Выберите предпочитаемый язык',
    'action.translating': 'Перевод...',

    // Loading
    'loading.step1.title': 'Мы здесь для вас',
    'loading.step1.subtitle': 'Уделяем время, чтобы понять ваши результаты',
    'loading.step2.title': 'Анализируем цифры',
    'loading.step2.subtitle': 'Переводим медицинские данные в понятную информацию',
    'loading.step3.title': 'Организуем важное',
    'loading.step3.subtitle': 'Выделяем то, что важно знать',
    'loading.step4.title': 'Готовим ваш персональный гид',
    'loading.step4.subtitle': 'Почти готовы всё объяснить',
    'loading.step5.title': 'Готово!',
    'loading.step5.subtitle': 'Ваши результаты готовы к просмотру',
    'loading.secure': 'Ваша информация защищена и конфиденциальна',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage.code];
    return langTranslations?.[key] || translations.en[key] || key;
  };

  const tTestName = (testId: string, fallback: string): string => {
    const trans = testNameTranslations[testId];
    if (trans) {
      return trans[currentLanguage.code] || trans.en || fallback;
    }
    return fallback;
  };

  const tTestDescription = (testId: string, fallback: string): string => {
    const trans = testDescriptionTranslations[testId];
    if (trans) {
      return trans[currentLanguage.code] || trans.en || fallback;
    }
    return fallback;
  };

  const tTestExplanation = (testId: string, fallback: string): string => {
    const trans = testExplanationTranslations[testId];
    if (trans) {
      return trans[currentLanguage.code] || trans.en || fallback;
    }
    return fallback;
  };

  const tCategoryName = (categoryId: string, fallback: string): string => {
    const trans = categoryNameTranslations[categoryId];
    if (trans) {
      return trans[currentLanguage.code] || trans.en || fallback;
    }
    return fallback;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        isTranslating,
        setIsTranslating,
        targetLanguage,
        setTargetLanguage,
        t,
        tTestName,
        tTestDescription,
        tTestExplanation,
        tCategoryName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
