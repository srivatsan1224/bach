import React from 'react';

const Categories = () => {
  const categories = [
    { 
      title: 'Community',
      icon: '🤝',
      description: 'Connect with people'
    },
    { 
      title: 'Workshops',
      icon: '🎯',
      description: 'Learn new skills'
    },
    { 
      title: 'Celebrations',
      icon: '🎉',
      description: 'Make memories'
    },
    { 
      title: 'Music',
      icon: '🎵',
      description: 'Feel the rhythm'
    },
    { 
      title: 'Fitness',
      icon: '💪',
      description: 'Stay active'
    },
    { 
      title: 'Arts',
      icon: '🎨',
      description: 'Be creative'
    },
    { 
      title: 'Adventures',
      icon: '🌄',
      description: 'Explore more'
    },
    { 
      title: 'Shows',
      icon: '🎭',
      description: 'Be entertained'
    }
  ];

  return (
    <div className="py-20 bg-background relative">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
          Discover Experiences
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">Choose from our wide range of events</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-3 group-hover:bg-primary-100 transition-all duration-300 transform group-hover:scale-110 shadow-sm">
                {category.icon}
              </div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary-600 transition-colors mb-1">
                {category.title}
              </p>
              <p className="text-xs text-muted-foreground hidden md:block">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;