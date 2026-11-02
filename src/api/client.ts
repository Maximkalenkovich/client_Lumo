import axios from "axios";
import useUserStore from "@/store/store";
import type {
  Match,
  MyProfile,
  Photo,
  PublicProfile,
  ReportReason,
} from "@/types";

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    return message ?? error.message;
  }
  return String(error);
}

export type ProfileUpdate = Partial<
  Pick<MyProfile, "firstName" | "gender" | "lookingFor" | "city" | "bio">
> & { dateOfBirth?: string };

export const authWithTelegram = (initData: string) =>
  api
    .post<{ token: string; user: MyProfile }>("/auth/telegram", { initData })
    .then((r) => r.data);

export const getMe = () => api.get<MyProfile>("/users/me").then((r) => r.data);

export const updateMe = (data: ProfileUpdate) =>
  api.patch<MyProfile>("/users/me", data).then((r) => r.data);

export const uploadPhoto = (file: File) => {
  const form = new FormData();
  form.append("file", file);
  return api.post<Photo>("/avatar/me", form).then((r) => r.data);
};

export const deletePhoto = (photoId: string) =>
  api.delete(`/avatar/me/${photoId}`).then((r) => r.data);

export const getFeed = () =>
  api.get<PublicProfile[]>("/feed").then((r) => r.data);

export const swipe = (targetId: number, liked: boolean) =>
  api
    .post<{ matched: boolean; match?: Match }>("/swipes", { targetId, liked })
    .then((r) => r.data);

export const getMatches = () =>
  api.get<Match[]>("/matches").then((r) => r.data);

export const reportUser = (targetId: number, reason: ReportReason) =>
  api.post("/reports", { targetId, reason }).then((r) => r.data);
