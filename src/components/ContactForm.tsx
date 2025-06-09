import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface FormData {
  from_name: string;
  from_email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const ContactForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    from_name: '',
    from_email: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.from_name || !formData.from_email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.'
      });
      return;
    }

    setStatus({
      type: 'loading',
      message: 'Sending message...'
    });

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        'service_6qcgc43', // Replace with your EmailJS service ID
        'template_f1h28nl', // Replace with your EmailJS template ID
        form.current!,
        'bFbAEJKm63ZhCmhVA' // Replace with your EmailJS public key
      );

      console.log('Email sent successfully:', result.text);
      
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or contact me directly.'
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'loading':
        return <Loader className="animate-spin\" size={20} />;
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status.type) {
      case 'loading':
        return 'text-blue-400';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
      
      <form ref={form} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="from_name"
            value={formData.from_name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors"
            disabled={status.type === 'loading'}
          />
        </div>
        
        <div>
          <input
            type="email"
            name="from_email"
            value={formData.from_email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors"
            disabled={status.type === 'loading'}
          />
        </div>
        
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors resize-none"
            disabled={status.type === 'loading'}
          />
        </div>
        
        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {status.type === 'loading' ? (
            <>
              <Loader className="animate-spin\" size={20} />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Send Message</span>
            </>
          )}
        </button>
        
        {status.message && (
          <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-sm">{status.message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;


// import React, { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

// interface FormData {
//   name: string;
//   email: string;
//   message: string;
// }

// interface FormStatus {
//   type: 'idle' | 'loading' | 'success' | 'error';
//   message: string;
// }

// const ContactForm: React.FC = () => {
//   const form = useRef<HTMLFormElement>(null);
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     message: ''
//   });
//   const [status, setStatus] = useState<FormStatus>({
//     type: 'idle',
//     message: ''
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.message) {
//       setStatus({
//         type: 'error',
//         message: 'Please fill in all fields.'
//       });
//       return;
//     }

//     setStatus({
//       type: 'loading',
//       message: 'Sending message...'
//     });

//     if (!form.current) {
//       setStatus({
//         type: 'error',
//         message: 'Form not found. Please refresh and try again.'
//       });
//       return;
//     }

//     try {
//       const result = await emailjs.sendForm(
//         'service_6qcgc43', // Your EmailJS service ID
//         'template_u9v7l4n', // Your EmailJS template ID
//         form.current,
//         'bFbAEJKm63ZhCmhVA' // Your EmailJS public key
//       );

//       console.log('Email sent successfully:', result.text);

//       setStatus({
//         type: 'success',
//         message: "Message sent successfully! I'll get back to you soon."
//       });

//       // Reset form
//       setFormData({
//         name: '',
//         email: '',
//         message: ''
//       });
//     } catch (error) {
//       console.error('Email sending failed:', error);
//       setStatus({
//         type: 'error',
//         message: 'Failed to send message. Please try again or contact me directly.'
//       });
//     }
//   };

//   const getStatusIcon = () => {
//     switch (status.type) {
//       case 'loading':
//         return <Loader className="animate-spin" size={20} />;
//       case 'success':
//         return <CheckCircle size={20} />;
//       case 'error':
//         return <AlertCircle size={20} />;
//       default:
//         return null;
//     }
//   };

//   const getStatusColor = () => {
//     switch (status.type) {
//       case 'loading':
//         return 'text-blue-400';
//       case 'success':
//         return 'text-green-400';
//       case 'error':
//         return 'text-red-400';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-md mx-auto">
//       <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>

//       <form ref={form} onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors"
//             disabled={status.type === 'loading'}
//           />
//         </div>

//         <div>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Your Email"
//             className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors"
//             disabled={status.type === 'loading'}
//           />
//         </div>

//         <div>
//           <textarea
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows={4}
//             placeholder="Your Message"
//             className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:border-white/50 transition-colors resize-none"
//             disabled={status.type === 'loading'}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={status.type === 'loading'}
//           className="w-full px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//         >
//           {status.type === 'loading' ? (
//             <>
//               <Loader className="animate-spin" size={20} />
//               <span>Sending...</span>
//             </>
//           ) : (
//             <>
//               <Send size={20} />
//               <span>Send Message</span>
//             </>
//           )}
//         </button>

//         {status.message && (
//           <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
//             {getStatusIcon()}
//             <span className="text-sm">{status.message}</span>
//           </div>
//         )}
//       </form>

//       {/* Setup Instructions */}
//       <div className="mt-8 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
//         <h4 className="text-yellow-200 font-semibold mb-2">⚠️ Setup Required</h4>
//         <p className="text-yellow-100 text-sm">
//           To make this form work, you need to:
//         </p>
//         <ol className="text-yellow-100 text-sm mt-2 space-y-1 list-decimal list-inside">
//           <li>
//             Create an account at{' '}
//             <a
//               href="https://emailjs.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="underline"
//             >
//               emailjs.com
//             </a>
//           </li>
//           <li>Create an email service and template</li>
//           <li>Replace the placeholder IDs in ContactForm.tsx</li>
//           <li>Remove this setup notice</li>
//         </ol>
//       </div>
//     </div>
//   );
// };

// export default ContactForm;
