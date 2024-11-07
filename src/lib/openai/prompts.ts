export const SYSTEM_PROMPT = `أنت باحث أكاديمي متخصص في كتابة الأبحاث العلمية باللغة العربية.

عند كتابة أي قسم:
1. اقرأ العنوان والأقسام السابقة بعناية
2. حافظ على الترابط والتسلسل المنطقي
3. استخدم نفس المصطلحات والمفاهيم
4. أشر للنتائج والأفكار المذكورة سابقاً
5. استخدم التوثيق داخل النص باللغة العربية فقط
6. اكتب محتوى بحجم 900-1000 كلمة

عند متابعة الكتابة:
1. اقرأ المحتوى السابق بعناية
2. حافظ على نفس الأسلوب والسياق
3. استكمل الأفكار المطروحة
4. أضف معلومات وأدلة جديدة
5. اربط مع ما سبق من أفكار
6. استخدم نفس أسلوب التوثيق`;

export const SECTION_PROMPTS = {
  abstract: `اكتب ملخصاً للبحث بعنوان: "{{title}}"

يجب أن يتضمن الملخص (600-800 كلمة):
- الهدف الرئيسي من البحث
- المنهجية المستخدمة
- أهم النتائج والتوصيات
- الآثار والتطبيقات العملية`,

  introduction: `بناءً على عنوان البحث: "{{title}}"
والملخص السابق: "{{abstract}}"

اكتب مقدمة شاملة (900-1000 كلمة) تتضمن:
- خلفية عامة عن الموضوع
- مشكلة البحث وأهميته
- الأهداف والأسئلة البحثية
- الدراسات السابقة ذات الصلة`,

  methodology: `بناءً على:
العنوان: "{{title}}"
الملخص: "{{abstract}}"
المقدمة: "{{introduction}}"

اكتب قسم المنهجية (900-1000 كلمة) موضحاً:
- تصميم البحث ومنهجه
- مجتمع وعينة الدراسة
- أدوات جمع البيانات
- إجراءات التطبيق
- أساليب التحليل المستخدمة`,

  results: `بناءً على الأقسام السابقة:
العنوان: "{{title}}"
المنهجية: "{{methodology}}"

اكتب قسم النتائج (900-1000 كلمة) متضمناً:
- عرض النتائج الرئيسية
- تحليل البيانات
- الإجابة على أسئلة البحث
- دعم النتائج بالأدلة والإحصاءات`,

  discussion: `بناءً على:
العنوان: "{{title}}"
النتائج: "{{results}}"

اكتب قسم المناقشة (900-1000 كلمة) متضمناً:
- تفسير النتائج الرئيسية
- ربط النتائج بالدراسات السابقة
- مناقشة الآثار النظرية والعملية
- تحديد نقاط القوة والقيود`,

  conclusion: `بناءً على جميع الأقسام السابقة:
العنوان: "{{title}}"
النتائج: "{{results}}"
المناقشة: "{{discussion}}"

اكتب الخاتمة (900-1000 كلمة) متضمنة:
- ملخص لأهم النتائج
- الاستنتاجات الرئيسية
- التوصيات العملية
- مقترحات للبحوث المستقبلية`,

  continue: `استناداً إلى المحتوى السابق:

{{content}}

قم بمتابعة وتطوير نفس القسم مع:
- الحفاظ على نفس السياق والأسلوب
- استكمال الأفكار المطروحة
- إضافة معلومات وأدلة جديدة
- الربط مع ما سبق من أفكار
- استخدام التوثيق داخل النص باللغة العربية
- إضافة 400-500 كلمة جديدة`
};