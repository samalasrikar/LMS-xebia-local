import useScrollToSection from "../../hooks/useScrollToSection";
import TrainingEffectivenessCards from "../../components/executive/cards/TrainingEffectivenessCards";
import TrainingCharts from "../../components/training/TrainingCharts";
import TrainingInsights from "../../components/training/TrainingInsights";

export default function TrainingEffectiveness() {
  useScrollToSection();

  return (
    <div className="max-w-[1400px] mx-auto w-full space-y-6 animate-fadeIn">

      <div>
        <h1 className="text-[21px] font-bold text-slate-900">
          Training Effectiveness
        </h1>

        <p className="text-[13px] text-slate-500 mt-1">
          Measure training quality and business impact.
        </p>
      </div>

      {/* Course Completion */}
      <div id="course-completion">
        <TrainingEffectivenessCards />
      </div>

      {/* Assessment Performance */}
      <div id="assessment-performance">
        <TrainingCharts />
      </div>

      {/* Learner Engagement */}
      <div id="learner-engagement">
        <TrainingInsights />
      </div>

      {/* Learning Paths */}
      <div id="learning-paths" className="bg-white border rounded-xl p-6 space-y-2 hover-lift transition-all duration-200">
        <h3 className="text-base font-bold text-[#6C1D5F]">Learning Paths Analysis</h3>
        <p className="text-xs text-slate-550">Track capability building milestones, cross-skilling journey progress, and curriculum completion rates.</p>
        <div className="h-28 bg-slate-50 border border-slate-150 rounded-lg flex items-center justify-center text-xs text-slate-400 italic">
          Path-wise completion statistics are being processed.
        </div>
      </div>
    </div>
  );
}