import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useSelector } from 'react-redux';

const Testimonials = () => {
  const { branding } = useSelector((state) => state.brandDetails);

  const testimonials = [
    {
      id: '1',
      name: 'Jessica Martinez',
      role: 'Frontend Developer',
      company: 'Tech Innovations',
      content:
        'The React course completely transformed my career. I went from junior to senior developer in just 8 months. The practical projects and expert guidance made all the difference.',
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '2',
      name: 'David Park',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      content:
        "Best investment I've made in my career. The Python for Data Science course is incredibly comprehensive and practical. I'm now leading data projects at my company.",
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    {
      id: '3',
      name: 'Emma Thompson',
      role: 'UX Designer',
      company: 'Design Studio',
      content:
        'The UI/UX course exceeded my expectations. Real-world projects, industry insights, and amazing community support. I landed my dream job 2 weeks after completing the course.',
      rating: 5,
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful graduates who have transformed their
            careers with our courses.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: branding.brandColor }}
                >
                  <Quote className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current"
                    style={{ color: branding.brandColor }}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: branding.brandColor }}
              >
                98%
              </div>
              <div className="text-gray-600">Course Completion Rate</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: branding.brandColor }}
              >
                4.9
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: branding.brandColor }}
              >
                85%
              </div>
              <div className="text-gray-600">Career Advancement</div>
            </div>
            <div className="text-center">
              <div
                className="text-3xl font-bold mb-2"
                style={{ color: branding.brandColor }}
              >
                50K+
              </div>
              <div className="text-gray-600">Happy Students</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
