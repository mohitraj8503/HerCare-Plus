import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  select: vi.fn(),
  eq: vi.fn(),
  maybeSingle: vi.fn(),
  limit: vi.fn(),
}));

vi.mock("next-auth/next", () => ({
  getServerSession: mocks.getServerSession,
}));

vi.mock("@/lib/authOptions", () => ({
  authOptions: {},
}));

vi.mock("@/lib/supabaseAdmin", () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: mocks.select,
    })),
  },
}));

vi.mock("@/lib/medicalRecordAudit", () => ({
  logMedicalRecordAction: vi.fn(),
}));

import { GET as getVersions } from "../src/app/api/medical-records/versions/route";

describe("Medical record version-history authorization", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mocks.getServerSession.mockResolvedValue(null);
    mocks.select.mockReturnValue({ eq: mocks.eq });

    mocks.eq.mockImplementation(() => ({
      eq: mocks.eq,
      maybeSingle: mocks.maybeSingle,
      limit: mocks.limit,
    }));

    mocks.maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    mocks.limit.mockResolvedValue({
      data: [],
      error: null,
    });
  });

  it("rejects unauthenticated version-history requests", async () => {
    const response = await getVersions(
      new Request("http://localhost/api/medical-records/versions?id=record-123")
    );

    expect(response.status).toBe(401);
  });

  it("requires a document ID", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "user-b" },
    });

    const response = await getVersions(
      new Request("http://localhost/api/medical-records/versions")
    );

    expect(response.status).toBe(400);
  });

  it("does not reveal a record owned by another user", async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: "user-b" },
    });

    mocks.maybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    const response = await getVersions(
      new Request("http://localhost/api/medical-records/versions?id=user-a-record")
    );

    expect(response.status).toBe(404);
    expect(mocks.eq).toHaveBeenCalledWith("owner_id", "user-b");
  });
});
