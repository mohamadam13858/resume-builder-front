
import { ResumeData, useResumeStore } from '@/store/resumeStore';

type Props = {
  data: ResumeData;
};

export default function ResumePreview({ data }: Props) {
  const { personal, experiences } = data;

  return (
    <div className="p-10 pt-12 pb-16 font-sans text-gray-800 leading-relaxed">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-1">
          {personal.name || 'نام شما'}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          {personal.title || 'عنوان شغلی شما'}
        </p>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.linkedin && (
            <div>
              <a href={personal.linkedin} className="text-blue-600 hover:underline">
                LinkedIn
              </a>
            </div>
          )}
        </div>
      </div>

      {personal.summary && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 border-b pb-1">درباره من</h2>
          <p className="text-sm leading-6 whitespace-pre-line">{personal.summary}</p>
        </section>
      )}


      {experiences.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-1">تجربه‌های کاری</h2>
          <div className="space-y-7">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} {exp.endDate ? ` – ${exp.endDate}` : ' – تاکنون'}
                  </span>
                </div>
                <p className="font-medium text-base mb-2">{exp.company}</p>
                {exp.description && (
                  <p className="text-sm leading-6 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {experiences.length === 0 && personal.summary === '' && (
        <div className="text-center py-20 text-gray-400">
          اطلاعات را در سمت چپ وارد کنید تا اینجا نمایش داده شود...
        </div>
      )}
    </div>
  );
}