// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export default function Home() {
  const sections = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sections.current.includes(el)) {
      sections.current.push(el);
    }
  };

  // Form setup (uses Zod + react-hook-form)
  const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      alert('Message sent successfully!'); // Or use a toast library
      reset();
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-black text-gold min-h-screen">
      {/* Intro */}
      <motion.section
        id="home"
        className="bg-navy text-white py-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold">Hi, I&apos;m Abdurahman H Beriso</h1>
        <h3 className="text-3xl mt-4">Future Software Engineer & Youth Innovator</h3>
        <p className="max-w-2xl mx-auto mt-6 text-lg">
          I am a driven student pursuing a Bachelor&apos;s in Software Engineering, blending technical skills in Next.JS and Python with demonstrated leadership and innovation. A NASA Space Apps Galactic Problem Solver and Yale Young African Scholar, I&apos;m focused on developing impactful, community-focused solutions.
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://linkedin.com/in/abduh_b" className="text-neon-blue hover:underline">LinkedIn</a>
          <a href="https://t.me/mercynuf" className="text-neon-blue hover:underline">Telegram</a>
          <a href="myresume.download" className="text-neon-blue hover:underline">Resume</a>
        </div>
      </motion.section>

      {/* About Me */}
      <section id="about" className="py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-dark-green"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <p className="max-w-3xl mx-auto text-lg mb-4">
          As an aspiring Software Engineer at the Sheger Institute of Technology, my passion lies in creating robust and accessible digital solutions. I possess core skills in Python, Next.JS, and SQL, complemented by proficiency in design tools like Figma. My approach emphasizes learning quickly, coordinating teams, and leveraging technology to solve local problems, such as my work on the CemX and CareerPathX platforms.
        </p>
        <p className="max-w-3xl mx-auto text-lg mb-4">
          My journey is anchored by exceptional achievements in leadership and aerospace innovation. I am an Alumni of the Yale Young African Scholars (YYAS) program and a NASA Space Apps Challenge Galactic Problem Solver. Furthermore, I was a development winner in the Space Way 2024 CubeSat Project Launching team. These experiences showcase my ability to tackle complex problems and lead high-stakes projects.
        </p>
        <div className="text-center">
          <a href="myresume.download" className="bg-neon-blue text-black px-6 py-3 rounded-lg hover:bg-gold">Resume</a>
        </div>
      </section>

      {/* Interviews/Media */}
      <section id="interviews" className="bg-dark-green py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-gold"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Interviews
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-navy p-6 rounded-lg">
            <h3 className="text-2xl text-neon-blue">Bishoftu City Media</h3>
            <p>Discussing ODA students inspiration for Innovation and about the Bishoftu Automotive Industry Inventions.</p>
            <a href="https://youtu.be/uLWDxIS8eeg?t=247" className="text-gold hover:underline">Watch Video</a>
          </div>
          <div className="bg-navy p-6 rounded-lg">
            <h3 className="text-2xl text-neon-blue">Addis Media Network (AMN) TV</h3>
            <p>Interview on community support for students in education.</p>
            <a href="https://youtu.be/B4rY50_8r_A?t=242" className="text-gold hover:underline">Watch Video</a>
          </div>
        </div>
      </section>

      {/* My Journey */}
      <section id="journey" className="py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-dark-green"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Journey
        </motion.h2>
        <h3 className="text-3xl text-center mb-4 text-neon-blue">Education</h3>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-navy p-4 rounded-lg">
            <h4 className="text-xl text-gold">2026 - Present</h4>
            <p>Bachelor&apos;s Degree - Sheger Institute Of Technology (SIT), Ethiopia</p>
            <p>Currently pursuing a degree in Software Engineering.</p>
            <a href="sited.info" className="text-neon-blue">More Info</a>
          </div>
          <div className="bg-navy p-4 rounded-lg">
            <h4 className="text-xl text-gold">2021 - 2025</h4>
            <p>High School - ODA SBS</p>
            <p>Elected as Student Body Council President (2022), demonstrating strong leadership and community coordination skills.</p>
          </div>
          <div className="bg-navy p-4 rounded-lg">
            <h4 className="text-xl text-gold">2023</h4>
            <p>Trainee and Science and Engineering Fair Alumni at Foka STEM center.</p>
          </div>
          <div className="bg-navy p-4 rounded-lg">
            <h4 className="text-xl text-gold">2012 - 2020</h4>
            <p>Primary School</p>
            <p>Developed foundational skills and early interest in technology and leadership.</p>
          </div>
        </div>
        <h3 className="text-3xl text-center mt-8 mb-4 text-neon-blue">Achievements</h3>
        <ul className="max-w-3xl mx-auto list-disc pl-8 space-y-2">
          <li>Yale Young African Scholars (YYAS): Candidate and Alumni of the 2024 College Prep Summer Program.</li>
          <li>NASA Space Apps Challenge: Recognized as a Galactic Problem Solver for innovative solutions.</li>
          <li>Space Way 2024: CubeSat Project Launching winner (Development role in Pioneers team) after a 6-month trainee program.</li>
          <li>Brighter Generation Leadership: 2024 Summer Virtual Program Trainee and Volunteer focused on Leadership Skills and Community Development.</li>
        </ul>
      </section>

      {/* My Skills & Testimonials */}
      <section id="skills" className="bg-dark-green py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-gold"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl text-neon-blue mb-4">Technical Skills</h3>
            <p><strong>Frameworks/Libraries:</strong> Next.JS, Django</p>
            <p><strong>Languages:</strong> Python, JavaScript (JS), C++, SQL</p>
            <p><strong>Design/Tools:</strong> Figma, Canva, Adobe</p>
          </div>
          <div>
            <h3 className="text-2xl text-neon-blue mb-4">Soft Skills</h3>
            <p>Public Speaking, Leadership Skills, Event Coordinating, 4 Languages (English, Arabic, Oromo, Amharic), basic Conversation in Chinese and French.</p>
          </div>
        </div>
        <h3 className="text-3xl text-center mt-8 mb-4 text-neon-blue">Testimonials</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-navy p-6 rounded-lg text-center">
            <img src="https://wmoda.org.et/wp-content/uploads/2025/02/Dejene-Eticha.jpg" alt="Dejene Iticha" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/96?text=DI'}/>
            <p className="italic">&quot;Keep working hard and smart; you are the future leader!&quot;</p>
            <cite className="block mt-2 text-gold">- Dejene Iticha, Oromia Development Association Executive Director</cite>
          </div>
          <div className="bg-navy p-6 rounded-lg text-center">
            <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=401425078814994" alt="Prof. Birhanu Tafesa" className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/96?text=BT'}/>
            <p className="italic">&quot;You are a smart learner; I will see your impact soon!&quot;</p>
            <cite className="block mt-2 text-gold">- Prof. Birhanu Tafesa, NASA Scientist and founder of SIT</cite>
          </div>
          <div className="bg-navy p-6 rounded-lg text-center">
            {/* No image for Biruk, placeholder */}
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-neon-blue to-dark-green mb-4 flex items-center justify-center text-gold font-bold text-xl">  Biruk Daniel </div>
            <p className="italic">&quot;It&apos;s really a great honor to work alongside enthusiasts like you, and we will meet in the future for a greater project!&quot;</p>
            <cite className="block mt-2 text-gold">- Biruk Daniel, ESS Youth Ambassador and Asteroid Discoverer</cite>
          </div>
        </div>
      </section>

      {/* My Projects */}
      <section id="projects" className="py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-dark-green"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-navy p-6 rounded-lg">
            <h3 className="text-2xl text-neon-blue">CemX</h3>
            <p>A Cement Exchanging Desktop Application Platform. The project focused on the design and logic for processing cement exchange, with the user interface designed entirely using Figma.</p>
            <a href="https://github.com/Abdu-Pro" className="text-gold hover:underline">GitHub</a>
          </div>
          <div className="bg-navy p-6 rounded-lg">
            <h3 className="text-2xl text-neon-blue">CareerPathX</h3>
            <p>A Career Guidance Responsive Website aimed at providing resources and direction for users. Built with core web technologies: HTML5, CSS, and JavaScript (JS), ensuring a seamless experience across all devices.</p>
            <a href="https://github.com/Abdu-Pro" className="text-gold hover:underline">GitHub</a>
          </div>
          <div className="bg-navy p-6 rounded-lg">
            <h3 className="text-2xl text-neon-blue">EDUHACKS</h3>
            <p>An educational content distribution platform for Ethiopian High School Students. It provides easy access to various educational content and important updates via a tailored Telegram solution.</p>
            <a href="https://t.me/ethio_eduhacks" className="text-gold hover:underline">Telegram</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-dark-green py-16 px-8" ref={addToRefs}>
        <motion.h2
          className="text-4xl font-bold text-center mb-8 text-gold"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Contact Me
        </motion.h2>
        <form 
          className="max-w-xl mx-auto space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-4 bg-black text-white rounded-lg" 
            {...register('name')}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          
          <input 
            type="email" 
            placeholder="Your Email" 
            className="w-full p-4 bg-black text-white rounded-lg" 
            {...register('email')}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          
          <textarea 
            placeholder="Your Message" 
            className="w-full p-4 bg-black text-white rounded-lg h-32"
            {...register('message')}
          ></textarea>
          {errors.message && <p className="text-red-500">{errors.message.message}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-neon-blue text-black p-4 rounded-lg hover:bg-gold disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      <footer className="bg-navy text-white py-4 text-center">
        <p>&copy; 2025 Abdurahman H Beriso. All rights reserved.</p>
      </footer>
    </main>
  );
}