import AppLayout from "../components/layout/AppLayout";
import { ArrowRight, BookOpen, Users, Clock } from "lucide-react";

export default function Curriculum() {
  const courses = [
    {
      title: "Modern Web Architectures & Design Systems",
      description: "Master the art of building scalable web applications using the latest CSS frameworks and component-based architectures.",
      category: "Frontend",
      topic: "Design",
      level: "Intermediate",
      duration: "12h 45m",
      modules: "24 units",
      students: "1,240",
      instructor: {
        name: "David Chen",
        role: "Lead Engineer",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmVw8kMMVV6tGnTM17F7j_wpAPdrJWNhNSV8jjqqkzRIIowUAibD5dBJPjb6r8sLmXnlq6z4zbAThP9xqCNhSX1iTFpxuryJD4-8PZnShr9k-QXHKevw4UzWpyKXyMu1aLoaGeumvaCXNVZUJNGPh57OZy_b42ldWEh1DQqKQRv0B9C3td-r_9-s0ZHYyUf3aks_aQwO57iB-jcFN4gvTv8An0oD8eqw08SksSVbl2Uk_a3hxWpVqRNewvjGRxyZDfYfCz27a6pi4",
      },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM0aVBLKNM0STv-wNxtNLQn869P4M_Ebruez5tbWOmKsjDdEI2H3yfSmbcxPeoI97SMLHhMehqT-hI4w36VrRpe4zAouZdwEW777CddM_mS_QBo1U1cf-sXgbNp0DHR9gekfSP0CvmP2IJul1-qlxA9F99sKhdAPep2LPTORwtCCz0rMfW_wSpwXXWXSj1eclt_Zq1Oeg9JUFahUq-CGNJ6yUwRjpQqV6icpm2leq5GnO861a8YHb5VMEDzZk2MLUEWN6-yajWY5E",
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Generative AI for Creative Developers",
      description: "Explore the frontiers of LLMs and Diffusion models. Learn to integrate advanced AI capabilities into your existing products.",
      category: "AI & ML",
      topic: "Python",
      level: "Advanced",
      duration: "18h 20m",
      modules: "32 units",
      students: "850",
      instructor: {
        name: "Elena Rodriguez",
        role: "AI Research Scientist",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeMXOPiP1A0Jt5xZMBwzUK3x-yVPFf3-9ZPSeeCVbZ1cas7Q7geKn-LML_W_PspHjMEvTu1jdYFK8leiJc5Xh-0uMfIvcuZollQzgKBRjj5GGmu_3iGn2OX18u9Ssu8tFKQtxZ_9U5NDS3ZbAXWLATh8mZMIm8A_mB3nBsgfKk1IaNSfuI47Tk_Er6379pdHpJVqg4CsfEXOGNofhvSj2ykFlZxYykMpBET9sGlXhJkDCOfuW-Ue7ovAe7o6WmiNvdBi06Ro94fb8",
      },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjSS95h8T9v3qPYx9hL3VVH91yrkojIdWmCGPfZ__lNTdfm8yc56NqlHbBiogBcpKWB4tCaSxvFaFkbhmeT0lBylAk-VLKnqcYxa0QJzOZkQC_ZXLYmmCfuvCTU9JkDlVukM5AWT5fjjxoSXTnxJ16WSaHGT2-zMS7L1Fgtm82fEmmlq-pzkkOIWKn8Hx2BlTE5ecA-zCewIJBCMIN1OpUNK4oyHf3eu_Bu7I9TehNNxyAuZKHq-rySgRLd9vytA--_lGwLAcakY",
      color: "bg-teal-100 text-teal-700",
    },
    {
      title: "Ethical Hacking & Network Security",
      description: "Protect your applications from modern threats. A comprehensive guide to defensive programming and security audits.",
      category: "Security",
      topic: "Network",
      level: "Beginner",
      duration: "10h 15m",
      modules: "18 units",
      students: "2,100",
      instructor: {
        name: "Marcus Thorne",
        role: "Security Architect",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRfaA_z4vaLyOMB9WmNBdfY2uygz1o_XG1YsHooNExaAjesVvIwsQ0JCtHFsgHplfadiSrwZs4BxvKKWto_MpZcAH2sDinexIi9oF4NVza9kBtiZnLIVL1aYCvgg5pjlEWABx1qiJNAYBMDJ-7sVI47fByxhs7MAfbR0IxpptAGTvKzEOS5odmcrNuddliPSnLGXMQ6dl2yZgEcgbgrNKUu_iNZh0djbNPG0NVdeyI-rZ5KVmoy36l7TI3tgNtbDPORN9f5iaSFLY",
      },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJsUQJmoaxwdtjNwra5VdAqmCU9Z-iMKwzKeZKzEJLplshq1StC7e29hPO76dkYnEd75RP319rkWIqpRR3TCD8K9Gx3Ri2AUPIK70lQ7R0oxQ5N-hC84L9Us9JUvVJ2o77O3K6zmskd5mIWaw4svBSSH2OVE2No27AkNHzakMcS8YuliCdM2dNBiGTiU6Vd-itzm7FesrIUT7PTo1xcuChlb-bXjk4y4S0iQMs6UVH6pqB5OfhWzcBm1H_AVlo8c6F8Vu-kwcwa4",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Data Storytelling with Tableau & Python",
      description: "Turn raw data into compelling narratives. Learn the psychological principles of effective data visualization.",
      category: "Data Science",
      topic: "Visualization",
      level: "Intermediate",
      duration: "15h 30m",
      modules: "28 units",
      students: "1,890",
      instructor: {
        name: "Sarah Jenkins",
        role: "Senior Data Analyst",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKJ316aGv_s9a3kikQPwNc9QnJYdTBeTA9Z6CfR2sAXHLn5DuxJsN3gRdugKG6lcA2EbDTNVwVCbKec-db_d8YqAHXltmZ_EyvwMdunLfJI_0ba_aCrwJXKxbbRglQiT8du7w7bbw2BVrEjbHyaZCmY6Cntf5VGoobzKUPicC0QHTzjGwfN6bMHKqKmh9IwiSan51NXV481bbIr3g-KV8i7QN2-MlbNyyc0lmbsmzBYXaDkxxdnXvS0tYAfwdwLaAW7qmhwVvUl5s",
      },
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzume19JbCzQiTlL25O0aJqcPiJisdnzlI8tctD5MVbTL2o47AXW0CKBARe4TR8lxgubCk6ofpj3_k77s_-Q7cV2G3OSJdqJPoCaXSc8zyDuSl4xllmZE0guZLoxXqr4EN1wKBXctY9p8Tq88Yktc4OGKPEUmTxF81XGqKhoThnJzJbTFZVPR7g-aS9GUMIQmtGlrsqb43E7qNQlqOZbNenPHi0JFIxBumv_nAa8bUIyUWe92NL13BFnXOuqfF2qXFY44FzFR_D_s",
      color: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Curriculum Management</h1>
          <p className="text-slate-500 text-sm mt-1">Structure and review active educational programs.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((course, index) => (
            <article
              key={index}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={course.image}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-purple-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {course.level}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-semibold bg-purple-50 text-purple-700 px-2.5 py-1 rounded uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded uppercase tracking-wider">
                    {course.topic}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-1">
                  {course.title}
                </h3>
                
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed flex-1">
                  {course.description}
                </p>

                <div className="flex items-center gap-2 mb-4 border-t border-b border-slate-100 py-3">
                  <img
                    alt={course.instructor.name}
                    className="w-7 h-7 rounded-full object-cover"
                    src={course.instructor.avatar}
                  />
                  <div className="text-xs">
                    <span className="text-slate-800 font-semibold">{course.instructor.name}</span>
                    <span className="text-slate-300 mx-1.5">•</span>
                    <span className="text-slate-500 font-normal">{course.instructor.role}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Duration</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                        <Clock size={12} className="text-slate-400" /> {course.duration}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Modules</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                        <BookOpen size={12} className="text-slate-400" /> {course.modules}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Students</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center gap-1 mt-0.5">
                        <Users size={12} className="text-slate-400" /> {course.students}
                      </span>
                    </div>
                  </div>

                  <button className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all flex items-center gap-1.5">
                    Open <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
