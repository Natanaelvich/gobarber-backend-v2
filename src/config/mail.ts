interface ImailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'taelima1997@gmail.com',
      name: 'Natanael da Silva Lima',
    },
  },
} as ImailConfig;

export default mailConfig;
