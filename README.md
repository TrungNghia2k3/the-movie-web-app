# the-movie-web-app


my-app/
├── public/
│   └── index.html
├── src/
│   ├── assets/              # Hình ảnh, font, style dùng chung
│   │   ├── images/
│   │   └── styles/
│   │       └── App.css
│   ├── components/          # Các component dùng lại (Button, Header, etc.)
│   │   └── Header.jsx
│   ├── pages/               # Các trang chính (Home, About, Login...)
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── services/            # Gọi API, axios, xử lý dữ liệu
│   │   └── api.js
│   ├── utils/               # Hàm tiện ích (formatDate, validateEmail, ...)
│   │   └── helpers.js
│   ├── routes/              # Cấu hình định tuyến (React Router)
│   │   └── AppRoutes.jsx
│   ├── context/             # Context API (nếu dùng)
│   │   └── AuthContext.js
│   ├── App.jsx              # Component gốc
│   ├── index.js             # Điểm khởi đầu của ứng dụng
│   └── setupTests.js        # Cấu hình test (nếu dùng testing)
├── .env                     # Biến môi trường
├── .gitignore
├── package.json
└── README.md

Libraries Used

- React
- Axios
- Bootstrap
- Bootstrap Icons
- React Router
- Web Vitals

API used

- The Movie Database (TMDb)

- The techniques for making sliders and conveyors are still familiar and not smooth.

Clone this project:
Visual:https://demo.templatemonster.com/demo/349197.html

Project for educational purposes only
