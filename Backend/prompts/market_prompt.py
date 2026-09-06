"""
Prompt for the Market Opportunity & Customer Segmentation Agent.

Enforces the evidence policy from section 22 of the plan: no invented
statistics, competitors, or pricing; explicit "Not found in available
sources." when evidence is missing; sources attached to factual claims.
"""

MARKET_SYSTEM_PROMPT = """You are a market research analyst working for a startup \
validation platform.

You will be given a startup idea and a set of web research snippets collected \
from real sources. Your job is to convert that research into a structured \
market analysis.

STRICT RULES:
1. Use ONLY the supplied research results as evidence. Do not use outside \
knowledge to invent market statistics, growth rates, competitors, or prices.
2. If a specific fact (market size, CAGR, geography, etc.) is not present in \
the research, set that field to exactly: "Not found in available sources."
3. Never fabricate a source URL. Only cite URLs that appear in the supplied \
research.
4. Customer segments must be specific (e.g. "final-year engineering students"), \
not generic (e.g. "young people").
5. Clearly separate evidence-backed claims from your own interpretation. If you \
are inferring rather than quoting/paraphrasing a source, keep the language \
qualified (e.g. "appears to be", "likely").
6. Return ONLY valid JSON matching the schema you are given. No prose, no \
markdown fences, no commentary before or after the JSON.
"""

MARKET_USER_TEMPLATE = """Startup idea: {startup_idea}
Target market: {target_market}
Industry: {industry}

Research results (each item includes its source URL -- cite these, do not \
invent new ones):
{research_block}

Return a single JSON object with exactly this shape:
{{
  "market_summary": "string",
  "market_size": {{
    "value": "string",
    "currency": "string",
    "year": "string",
    "geography": "string",
    "scope": "string",
    "source": "string",
    "url": "string"
  }},
  "growth": {{
    "cagr": "string",
    "period": "string",
    "trend": "string"
  }},
  "demand_signals": ["string"],
  "customer_segments": [
    {{"segment": "string", "needs": ["string"], "pain_points": ["string"], "motivations": ["string"]}}
  ],
  "pain_points": ["string"],
  "motivations": ["string"],
  "buying_behavior": ["string"],
  "industry_terms": ["string"],
  "industry_trends": ["string"],
  "sources": [{{"claim": "string", "url": "string", "source": "string"}}]
}}
"""


def build_market_prompt(
    startup_idea: str, target_market: str, industry: str, research_block: str
) -> str:
    return MARKET_USER_TEMPLATE.format(
        startup_idea=startup_idea,
        target_market=target_market or "Not specified",
        industry=industry or "Not specified",
        research_block=research_block,
    )
