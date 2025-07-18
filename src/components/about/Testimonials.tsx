import Image from "next/image";

const testimonials = [
  {
    name: "Alex Thompson",
    program: "Computer Science, Stanford University",
    quote:
      "The guidance I received from EduConsult was invaluable. They helped me navigate the complex application process and find the perfect program for my interests.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  {
    name: "Priya Patel",
    program: "Business Administration, London Business School",
    quote:
      "Thanks to EduConsult, I was able to secure a scholarship for my MBA. Their personalized approach and attention to detail made all the difference.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  {
    name: "James Wilson",
    program: "Medicine, University of Melbourne",
    quote:
      "The team at EduConsult provided exceptional support throughout my medical school applications. Their expertise in international education was crucial to my success.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-blue-50 component-px">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Why trust us?
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Don&apos;t just take our word for it. Here&apos;s what students have
          to say about their experience with EduConsult.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                width={60}
                height={60}
                className="rounded-full mr-4 aspect-square object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                <p className="text-sm text-gray-600">{testimonial.program}</p>
              </div>
            </div>
            <p className="text-gray-600 italic">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
