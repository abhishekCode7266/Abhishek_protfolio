/**
 * English & Hindi Localization Dictionaries
 * Allows dynamic switching across the portfolio content.
 */

export type Language = "en" | "hi";

export interface Translations {
  nav: {
    home: string;
    about: string;
    skills: string;
    education: string;
    experience: string;
    certifications: string;
    projects: string;
    contact: string;
    resumePdf: string;
    editOnGithub: string;
  };
  hero: {
    statusBadge: string;
    greeting: string;
    highlight: string;
    title: string;
    intro: string;
    exploreProjects: string;
    exportResume: string;
    editProfile: string;
  };
  about: {
    badge: string;
    heading: string;
    p1: string;
    p2: string;
    capabilitiesTitle: string;
    terminalTitle: string;
    terminalSubtitle: string;
    terminalNote: string;
  };
  skills: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  education: {
    badge: string;
    heading: string;
    subtitle: string;
    primaryBadge: string;
    aggregate: string;
  };
  experience: {
    badge: string;
    heading: string;
    subtitle: string;
  };
  certifications: {
    badge: string;
    heading: string;
    subtitle: string;
    inspect: string;
    download: string;
    verify: string;
  };
  projects: {
    badge: string;
    heading: string;
    subtitle: string;
    searchPlaceholder: string;
    resetFilters: string;
    noProjects: string;
    liveDemo: string;
    repo: string;
    all: string;
  };
  contact: {
    badge: string;
    heading: string;
    subtitle: string;
    channelsTitle: string;
    channelsDesc: string;
    emailLabel: string;
    locationLabel: string;
    locationValue: string;
    formTitle: string;
    formDesc: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFormLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
  };
  footer: {
    title: string;
    backToTop: string;
    rights: string;
    builtFor: string;
  };
  resumeModal: {
    title: string;
    subtitle: string;
    printButton: string;
    downloadButton: string;
    includeSections: string;
    experienceToggle: string;
    projectsToggle: string;
    certificationsToggle: string;
    summaryHeading: string;
    academicHeading: string;
    skillsHeading: string;
    experienceHeading: string;
    projectsHeading: string;
    certificationsHeading: string;
    printTip: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      education: "Education",
      experience: "Experience",
      certifications: "Certifications",
      projects: "Projects",
      contact: "Contact",
      resumePdf: "Resume PDF",
      editOnGithub: "Edit on GitHub",
    },
    hero: {
      statusBadge: "Open to Internship & Trainee Roles",
      greeting: "Hello, I'm Abhishek",
      highlight: "Singh Yadav",
      title: "Computer Science Student • Software Developer",
      intro:
        "B.Tech Computer Science undergraduate at LD College of Technical Studies. Passionate about software development, web development, Python, Java, and building practical applications.",
      exploreProjects: "Explore Projects",
      exportResume: "Export Resume (PDF)",
      editProfile: "Edit Profile",
    },
    about: {
      badge: "Profile Overview",
      heading: "About Me",
      p1: "I am a B.Tech Computer Science undergraduate with a strong focus on Data Analytics, software development, web development, Python, Java, and practical application building.",
      p2: "Driven by curiosity and analytical thinking, I enjoy transforming raw data into meaningful insights, developing structured software architectures, and designing intuitive user interfaces. I continuously expand my skill set through hands-on technical projects, algorithmic problem solving, and modern development workflows.",
      capabilitiesTitle: "Core Engineering Capabilities:",
      terminalTitle: "Interactive Developer Terminal",
      terminalSubtitle: "Python & JavaScript",
      terminalNote: "Clean, reproducible syntax emphasizing algorithmic clarity and data structures.",
    },
    skills: {
      badge: "Technical Capabilities",
      heading: "Skills & Tech Stack",
      subtitle:
        "Core technical proficiencies across analytical data stacks, full-stack web architectures, and engineering tools.",
    },
    education: {
      badge: "Academic Milestones",
      heading: "Academic Background",
      subtitle:
        "Rigorous technical training in computer engineering, algorithm design, and data structures.",
      primaryBadge: "Primary Degree",
      aggregate: "Aggregate",
    },
    experience: {
      badge: "Practical Immersion",
      heading: "Internship Experience",
      subtitle:
        "Real-world software development workflows, data processing, and collaborative project execution.",
    },
    certifications: {
      badge: "Verified Knowledge",
      heading: "Certifications & Credentials",
      subtitle:
        "Accredited course completions and technical specializations in Artificial Intelligence and Data Analytics.",
      inspect: "Inspect",
      download: "Download",
      verify: "Verify Credential",
    },
    projects: {
      badge: "Applied Engineering",
      heading: "Featured Projects",
      subtitle:
        "Production codebases, interactive AI action systems, and data-driven computational applications.",
      searchPlaceholder: "Search projects or tech...",
      resetFilters: "Reset filters",
      noProjects: "No projects found matching your query.",
      liveDemo: "Live Demo",
      repo: "Code Repository",
      all: "All",
    },
    contact: {
      badge: "Get In Touch",
      heading: "Let's Connect",
      subtitle:
        "Open to internship opportunities, software developer roles, and technical collaborations.",
      channelsTitle: "Contact Channels",
      channelsDesc:
        "Feel free to reach out directly via email or connect with me on GitHub and LinkedIn.",
      emailLabel: "Email Address",
      locationLabel: "Location",
      locationValue: "India (Open to Remote & Relocation)",
      formTitle: "Send a Message",
      formDesc: "Fill in the details below to initiate direct correspondence.",
      nameLabel: "Your Name *",
      namePlaceholder: "John Doe",
      emailFormLabel: "Your Email *",
      emailPlaceholder: "john@example.com",
      messageLabel: "Your Message *",
      messagePlaceholder:
        "Hi Abhishek, I reviewed your portfolio and would like to discuss an opportunity...",
      sendButton: "Send Message",
      sending: "Preparing Message...",
      successTitle: "Mail Client Triggered!",
      successDesc:
        "Your message has been preformatted and opened in your email client addressed to",
      sendAnother: "Send Another Message",
    },
    footer: {
      title: "Computer Science Student • Software Developer",
      backToTop: "Back to top",
      rights: "All rights reserved.",
      builtFor: "Built for GitHub Pages Auto-Deploy",
    },
    resumeModal: {
      title: "Export Resume / Printable PDF",
      subtitle: "Formatted ATS-Friendly Layout • Dynamic Data",
      printButton: "Print / Save as PDF",
      downloadButton: "Download File",
      includeSections: "Include Sections:",
      experienceToggle: "Internship / Experience",
      projectsToggle: "Featured Projects",
      certificationsToggle: "Certifications",
      summaryHeading: "Professional Summary",
      academicHeading: "Academic Background",
      skillsHeading: "Technical Skills & Stack",
      experienceHeading: "Internship & Experience",
      projectsHeading: "Featured Technical Projects",
      certificationsHeading: "Certifications & Credentials",
      printTip: "Tip: In the print dialog, select 'Save as PDF' for an instant downloadable file.",
    },
  },
  hi: {
    nav: {
      home: "होम",
      about: "परिचय",
      skills: "कौशल",
      education: "शिक्षा",
      experience: "अनुभव",
      certifications: "प्रमाणपत्र",
      projects: "प्रोजेक्ट्स",
      contact: "संपर्क",
      resumePdf: "बायोडाटा PDF",
      editOnGithub: "GitHub पर एडिट करें",
    },
    hero: {
      statusBadge: "इंटर्नशिप और ट्रेनी भूमिकाओं के लिए उपलब्ध",
      greeting: "नमस्ते, मैं हूँ अभिषेक",
      highlight: "सिंह यादव",
      title: "कंप्यूटर साइंस छात्र • सॉफ्टवेयर डेवलपर",
      intro:
        "एलडी कॉलेज ऑफ टेक्निकल स्टडीज में बी.टेक कंप्यूटर साइंस के छात्र। सॉफ्टवेयर डेवलपमेंट, वेब डेवलपमेंट, पायथन, जावा और व्यावहारिक अनुप्रयोगों के निर्माण में समर्पित।",
      exploreProjects: "प्रोजेक्ट्स देखें",
      exportResume: "बायोडाटा डाउनलोड (PDF)",
      editProfile: "प्रोफ़ाइल एडिट",
    },
    about: {
      badge: "प्रोफ़ाइल अवलोकन",
      heading: "मेरे बारे में",
      p1: "मैं एलडी कॉलेज ऑफ टेक्निकल स्टडीज में बी.टेक कंप्यूटर साइंस का छात्र हूँ, जिसका मुख्य फोकस डेटा एनालिटिक्स, सॉफ्टवेयर विकास, आधुनिक वेब तकनीक, पायथन और जावा पर है।",
      p2: "जिज्ञासा और विश्लेषणात्मक सोच से प्रेरित होकर, मुझे अपरिष्कृत डेटा को सार्थक अंतर्दृष्टि में बदलना, सुदृढ़ सॉफ्टवेयर संरचना तैयार करना और सहज उपयोगकर्ता अनुभव डिजाइन करना पसंद है।",
      capabilitiesTitle: "प्रमुख तकनीकी क्षमताएं:",
      terminalTitle: "इंटरैक्टिव डेवलपर टर्मिनल",
      terminalSubtitle: "पायथन और जावास्क्रिप्ट",
      terminalNote: "एल्गोरिथम स्पष्टता और डेटा संरचनाओं पर केंद्रित स्वच्छ कोडिंग सिंटैक्स।",
    },
    skills: {
      badge: "तकनीकी दक्षता",
      heading: "कौशल और तकनीकी दक्षता",
      subtitle:
        "डेटा एनालिटिक्स स्टैक, फुल-स्टैक वेब संरचना और सॉफ्टवेयर इंजीनियरिंग टूल्स में मुख्य दक्षताएं।",
    },
    education: {
      badge: "शैक्षणिक योग्यता",
      heading: "शैक्षणिक पृष्ठभूमि",
      subtitle:
        "कंप्यूटर इंजीनियरिंग, एल्गोरिदम डिजाइन और डेटा संरचनाओं में तकनीकी अध्ययन।",
      primaryBadge: "मुख्य डिग्री",
      aggregate: "कुल अंक",
    },
    experience: {
      badge: "व्यावहारिक अनुभव",
      heading: "इंटर्नशिप और अनुभव",
      subtitle:
        "वास्तविक दुनिया के सॉफ्टवेयर वर्कफ़्लो, डेटा विश्लेषण और प्रोजेक्ट सहयोग।",
    },
    certifications: {
      badge: "प्रमाणित ज्ञान",
      heading: "प्रमाणपत्र और उपलब्धियां",
      subtitle:
        "आर्टिफिशियल इंटेलिजेंस और डेटा एनालिटिक्स में मान्यता प्राप्त तकनीकी प्रमाणपत्र।",
      inspect: "देखें",
      download: "डाउनलोड करें",
      verify: "सत्यापित करें",
    },
    projects: {
      badge: "व्यावहारिक इंजीनियरिंग",
      heading: "प्रमुख प्रोजेक्ट्स",
      subtitle:
        "वास्तविक कोडबेस, इंटरैक्टिव एआई एक्शन सिस्टम और डेटा-चालित व्यावहारिक सॉफ्टवेयर।",
      searchPlaceholder: "प्रोजेक्ट या तकनीक खोजें...",
      resetFilters: "फ़िल्टर रीसेट करें",
      noProjects: "आपकी खोज से मेल खाता कोई प्रोजेक्ट नहीं मिला।",
      liveDemo: "लाइव डेमो",
      repo: "कोड रिपॉजिटरी",
      all: "सभी",
    },
    contact: {
      badge: "संपर्क करें",
      heading: "मुझसे जुड़ें",
      subtitle:
        "इंटर्नशिप के अवसरों, सॉफ्टवेयर डेवलपर भूमिकाओं और तकनीकी सहयोग के लिए हमेशा उपलब्ध।",
      channelsTitle: "संपर्क माध्यम",
      channelsDesc:
        "ईमेल के माध्यम से सीधे संपर्क करें या GitHub और LinkedIn पर जुड़ें।",
      emailLabel: "ईमेल पता",
      locationLabel: "स्थान",
      locationValue: "भारत (रिमोट और स्थानांतरण के लिए तैयार)",
      formTitle: "संदेश भेजें",
      formDesc: "सीधे बातचीत शुरू करने के लिए नीचे विवरण भरें।",
      nameLabel: "आपका नाम *",
      namePlaceholder: "राहुल शर्मा",
      emailFormLabel: "आपका ईमेल *",
      emailPlaceholder: "rahul@example.com",
      messageLabel: "आपका संदेश *",
      messagePlaceholder:
        "नमस्ते अभिषेक, मैंने आपका पोर्टफोलियो देखा और आपसे एक अवसर के संबंध में बात करना चाहता हूँ...",
      sendButton: "संदेश भेजें",
      sending: "संदेश तैयार हो रहा है...",
      successTitle: "ईमेल क्लाइंट खुल गया!",
      successDesc: "आपका संदेश प्रारूपित होकर आपके ईमेल ऐप में खुल गया है:",
      sendAnother: "एक और संदेश भेजें",
    },
    footer: {
      title: "कंप्यूटर साइंस छात्र • सॉफ्टवेयर डेवलपर",
      backToTop: "शीर्ष पर जाएं",
      rights: "सर्वाधिकार सुरक्षित।",
      builtFor: "GitHub Pages ऑटो-डिप्लॉय के लिए निर्मित",
    },
    resumeModal: {
      title: "बायोडाटा / प्रिंट करने योग्य PDF",
      subtitle: "एटीएस-फ्रेंडली लेआउट • डायनामिक डेटा",
      printButton: "प्रिंट / PDF के रूप में सहेजें",
      downloadButton: "फ़ाइल डाउनलोड करें",
      includeSections: "अनुभाग शामिल करें:",
      experienceToggle: "इंटर्नशिप / अनुभव",
      projectsToggle: "प्रमुख प्रोजेक्ट्स",
      certificationsToggle: "प्रमाणपत्र",
      summaryHeading: "व्यावसायिक सारांश",
      academicHeading: "शैक्षणिक पृष्ठभूमि",
      skillsHeading: "तकनीकी कौशल",
      experienceHeading: "इंटर्नशिप और अनुभव",
      projectsHeading: "प्रमुख प्रोजेक्ट्स",
      certificationsHeading: "प्रमाणपत्र और साख",
      printTip: "सुझाव: प्रिंट डायलॉग में 'Save as PDF' चुनकर तुरंत पीडीएफ सुरक्षित करें।",
    },
  },
};
