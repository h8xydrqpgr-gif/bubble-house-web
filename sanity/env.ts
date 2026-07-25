const fallbackProjectId = "not-configured";

export const sanityEnv = {
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || fallbackProjectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production",
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || "2025-01-01",
};

export const isSanityConfigured =
  sanityEnv.projectId !== fallbackProjectId;
