import ExecutiveSummary from "./ExecutiveSummary";
import MarketOpportunity from "./MarketOpportunity";
import CustomerSegments from "./CustomerSegments";
import CompetitorLandscape from "./CompetitorLandscape";
import Sources from "./Sources";
import "./dashboard.css";

/**
 * Renders the full Milestone 2 structured startup analysis.
 * `report` is the FinalReport JSON returned from POST /validate.
 */
export default function StartupAnalysisDashboard({ report }) {
  if (!report) return null;

  return (
    <div className="startup-analysis-dashboard">
      <ExecutiveSummary report={report} />
      <MarketOpportunity marketAnalysis={report.market_analysis} />
      <CustomerSegments marketAnalysis={report.market_analysis} />
      <CompetitorLandscape competitorAnalysis={report.competitor_analysis} />
      <Sources sources={report.sources} />
    </div>
  );
}
