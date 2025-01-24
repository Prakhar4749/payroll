import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const BackButton = ({ 
  to = -1, 
  label = 'Back'
}) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (typeof to === 'string') {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group inline-flex items-center px-4 py-2 rounded-lg text-sm bg-white text-emerald-600 font-medium
        transition-all duration-200
        ${scrolled
          ? 'text-emerald-600 hover:bg-emerald-50'
          : 'text-emerald-600 hover:bg-emerald-50'
        }
        
      `}
    >
      <ArrowLeft className=
        {`h-5 w-5 mr-2 transition-transform duration-200 group-hover:-translate-x-1
        text-emerald-600`} />
      {label}
    </button>
  );
};

export{ BackButton};