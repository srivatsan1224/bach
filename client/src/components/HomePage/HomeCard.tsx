import { BookOpen, Video, ClipboardCheck } from "lucide-react";

const QuickLearning = () => {
  const learningTopics = [
    {
      id: 1,
      title: "JavaScript Essentials",
      description: "Master the fundamentals of JavaScript and start building interactive web applications.",
      category: "Web Development",
      duration: "4 Weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "React for Beginners",
      description: "Learn how to create modern UI components and manage state with React.",
      category: "Frontend Development",
      duration: "6 Weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Python for Data Science",
      description: "Analyze data, create visualizations, and use Python for machine learning.",
      category: "Data Science",
      duration: "8 Weeks",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1610018556010-6a11691bc905?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
          Quick Learning
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {topic.title}
                </h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{topic.category}</span>
                </div>
                
                <div className="flex justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-lg font-semibold text-emerald-600">{topic.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="text-lg font-semibold text-emerald-600">{topic.level}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                    <Video className="w-4 h-4" />
                    Watch Lesson
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-emerald-500 text-emerald-600 rounded-full font-medium hover:bg-emerald-50 transition-colors">
                    <ClipboardCheck className="w-4 h-4" />
                    Take Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickLearning;
