import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              TinH-c
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Nền tảng học online hiện đại, giúp bạn phát triển kỹ năng và đạt được mục tiêu nghề nghiệp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Liên kết
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/my-courses" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm">
                  Khóa học của tôi
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Danh mục
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400 text-sm">Programming</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Design</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Business</li>
              <li className="text-gray-600 dark:text-gray-400 text-sm">Marketing</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Theo dõi chúng tôi
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
            © 2026 TinH-c. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
