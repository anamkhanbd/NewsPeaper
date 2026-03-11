export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter uppercase text-gray-900">
          About <span className="text-emerald-600">NewsPeaper</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          We are a modern news publishing platform dedicated to delivering high-quality journalism and trending stories.
        </p>
      </div>

      <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-xl">
        <img 
          src="https://picsum.photos/seed/newsroom/1200/600" 
          alt="Newsroom" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="prose prose-lg max-w-none prose-emerald">
        <p>
          NewsPeaper was founded with a simple mission: to provide a clean, fast, and reliable platform for news consumption. In an era of information overload, we strive to curate the most important stories that matter to you.
        </p>
        <h3>Our Vision</h3>
        <p>
          To become the world's most trusted and accessible digital news destination, empowering readers with knowledge and diverse perspectives.
        </p>
        <h3>Our Values</h3>
        <ul>
          <li><strong>Integrity:</strong> We adhere to the highest standards of journalistic ethics.</li>
          <li><strong>Innovation:</strong> We leverage modern technology to enhance the reading experience.</li>
          <li><strong>Inclusivity:</strong> We cover stories from all walks of life and global regions.</li>
        </ul>
      </div>
    </div>
  );
}
