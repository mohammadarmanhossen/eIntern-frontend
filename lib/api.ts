import { Certificate } from "@/types/certificate";

export const getCertificates = async (): Promise<Certificate[]> => {
  return [
    {
      id: 1,
      studentName: "Mohammad Arman",
      internshipName: "Backend Development Internship",
      completionYear: 2025,
      fileUrl: "/certificates/cert1.pdf",
    },
    {
      id: 2,
      studentName: "Rakib Hasan",
      internshipName: "Frontend Development Internship",
      completionYear: 2025,
      fileUrl: "/certificates/cert2.pdf",
    },
    {
      id: 3,
      studentName: "Sadia Rahman",
      internshipName: "UI/UX Internship",
      completionYear: 2024,
      fileUrl: "/certificates/cert3.pdf",
    },
    {
      id: 4,
      studentName: "Nafis Ahmed",
      internshipName: "Data Analysis Internship",
      completionYear: 2024,
      fileUrl: "/certificates/cert4.pdf",
    },
    {
      id: 5,
      studentName: "Farhana Akter",
      internshipName: "Digital Marketing Internship",
      completionYear: 2025,
      fileUrl: "/certificates/cert5.pdf",
    },
    {
      id: 6,
      studentName: "Mehedi Hasan",
      internshipName: "DevOps Internship",
      completionYear: 2024,
      fileUrl: "/certificates/cert6.pdf",
    },
    {
      id: 7,
      studentName: "Tahsin Khan",
      internshipName: "Cyber Security Internship",
      completionYear: 2025,
      fileUrl: "/certificates/cert7.pdf",
    },
    {
      id: 8,
      studentName: "Ayesha Noor",
      internshipName: "QA Internship",
      completionYear: 2024,
      fileUrl: "/certificates/cert8.pdf",
    },
    {
      id: 9,
      studentName: "Imran Hossain",
      internshipName: "Cloud Computing Internship",
      completionYear: 2025,
      fileUrl: "/certificates/cert9.pdf",
    },
    {
      id: 10,
      studentName: "Nusrat Jahan",
      internshipName: "Mobile App Development Internship",
      completionYear: 2024,
      fileUrl: "/certificates/cert10.pdf",
    },
  ];
};
