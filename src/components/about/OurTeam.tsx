import Image from "next/image";

const teamMembers = [
  {
    name: "Dr. Sarah Johnson",
    role: "Founder & Lead Consultant",
    bio: "With over 15 years of experience in education consulting, Dr. Johnson has helped thousands of students achieve their academic goals.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  {
    name: "Prof. Michael Chen",
    role: "Career Counselor",
    bio: "Specializing in STEM careers, Prof. Chen brings industry experience and academic expertise to guide students toward technical careers.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
  {
    name: "Emma Rodriguez",
    role: "International Education Specialist",
    bio: "Emma helps students navigate the complexities of studying abroad with her extensive knowledge of international education systems.",
    image:
      "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
  },
];

export default function OurTeam() {
  return (
    <section className="component-py my-12 component-px">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Meet Our Expert Team
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Our team of experienced educators and career counselors are dedicated
          to helping you succeed.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
          >
            <div className="relative overflow-hidden h-64">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={400}
                className="w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1 text-gray-800">
                {member.name}
              </h3>
              <p className="text-primary font-medium text-sm mb-4">
                {member.role}
              </p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
