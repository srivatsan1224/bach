import { testimonials } from "../../assets/HomePage/testimonials";
const Testimonials: React.FC = () => {
    return (
        <div className="flex flex-wrap justify-center gap-8 py-12 bg-gray-50">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="flex flex-col justify-center items-start p-[20px] gap-[32px] isolate"
            style={{
              width: "374.33px",
              height: "280.37px",
              background: "#FFFFFF",
              boxShadow: "0px 28.9334px 61.5604px rgba(21, 21, 21, 0.15)",
              borderRadius: "16px",
            }}
          >
            {/* Profile Section */}
            <div className="flex items-center w-full">
              <div
                className="w-12 h-12 rounded-full overflow-hidden"
                style={{ flex: "none", order: 0, flexGrow: 0 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-auto flex items-center">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <span key={index} className="text-blue-500 text-lg">
                    ★
                  </span>
                ))}
              </div>
            </div>
  
            {/* Content */}
            <p
              className="text-gray-800 text-sm"
              style={{ flex: "none", order: 1, flexGrow: 0 }}
            >
              {testimonial.content}
            </p>
  
            {/* Name and Designation */}
            <div className="text-sm" style={{ flex: "none", order: 2, flexGrow: 0 }}>
              <h3 className="text-base font-semibold text-gray-900">
                {testimonial.name}
              </h3>
              <p className="text-gray-500">{testimonial.designation}</p>
            </div>
  
            
          </div>
        ))}
      </div>
   
    );
  };
  
  export default Testimonials;