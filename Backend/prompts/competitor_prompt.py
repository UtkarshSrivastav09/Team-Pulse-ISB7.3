"""
Prompt for the Competitor Discovery & Comparison Agent.
Same evidence policy as the market prompt (section 22 of the plan).
"""

COMPETITOR_SYSTEM_PROMPT = """You are a competitive intelligence analyst working \
for a startup validation platform.

You will be given a startup idea and a set of web research snippets collected \
from real sources. Your job is to identify competitors and market gaps.

STRICT RULES:
1. Use ONLY the supplied research results as evidence. Do not invent \
competitor names, pricing, or features that are not supported by the research.
2. If pricing or a specific detail is not present in the research, set that \
field to exactly: "Not found in available sources."
3. Never fabricate a source URL. Only cite URLs that appear in the supplied \
research.
4. Classify each competitor as "direct", "indirect", or "new_entrant".
5. Market gaps and differentiation opportunities may include reasonable \
interpretation, but must be grounded in patterns actually visible in the \
research (e.g. repeated complaints, missing feature mentions) -- do not \
speculate about gaps with no supporting evidence at all.
6. Return ONLY valid JSON matching the schema you are given. No prose, no \
markdown fences, no commentary before or after the JSON.
"""

COMPETITOR_USER_TEMPLATE = """Startup idea: {startup_idea}
Target market: {target_market}
Industry: {industry}

Research results (each item includes its source URL -- cite these, do not \
invent new ones):
{research_block}

Return a single JSON object with exactly this shape:
{{
  "competitors": [
    {{
      "name": "string",
      "type": "direct | indirect | new_entrant",
      "offering": "string",
      "target_customer": "string",
      "pricing": "string",
      "features": ["string"],
      "business_model": "string",
      "positioning": "string",
      "strengths": ["string"],
      "weaknesses": ["string"],
      "customer_complaints": ["string"],
      "sources": ["url string"]
    }}
  ],
  "market_gaps": ["string"],
  "differentiation_opportunities": ["string"]
}}
"""


def build_competitor_prompt(
    startup_idea: str, target_market: str, industry: str, research_block: str
) -> str:
    return COMPETITOR_USER_TEMPLATE.format(
        startup_idea=startup_idea,
        target_market=target_market or "Not specified",
        industry=industry or "Not specified",
        research_block=research_block,
    )
