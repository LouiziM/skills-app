export interface Evaluation {
  id: string
  employeeId: string
  employeeName: string
  type: "Manager" | "Self"
  date: string
  periodStart: string
  periodEnd: string
  scores: {
    communication: number
    technicalSkills: number
    problemSolving: number
    teamwork: number
    customerService: number
  }
  comments: string
  status: "Draft" | "Submitted" | "Reviewed"
  createdBy: string
}

export const evaluationsData: Evaluation[] = [
  {
    id: "1",
    employeeId: "101",
    employeeName: "Jean Dupont",
    type: "Manager",
    date: "2023-06-15",
    periodStart: "2023-01-01",
    periodEnd: "2023-06-01",
    scores: {
      communication: 4,
      technicalSkills: 3,
      problemSolving: 4,
      teamwork: 5,
      customerService: 4,
    },
    comments:
      "Jean has shown excellent progress in customer service and teamwork. Technical skills could use some improvement.",
    status: "Reviewed",
    createdBy: "Manager",
  },
  {
    id: "2",
    employeeId: "102",
    employeeName: "Marie Lambert",
    type: "Self",
    date: "2023-07-10",
    periodStart: "2023-01-01",
    periodEnd: "2023-06-30",
    scores: {
      communication: 3,
      technicalSkills: 5,
      problemSolving: 4,
      teamwork: 3,
      customerService: 4,
    },
    comments:
      "I believe I have improved my technical skills significantly. I would like to work on my communication skills.",
    status: "Submitted",
    createdBy: "Employee",
  },
  {
    id: "3",
    employeeId: "103",
    employeeName: "Pierre Martin",
    type: "Manager",
    date: "2023-05-20",
    periodStart: "2022-11-01",
    periodEnd: "2023-04-30",
    scores: {
      communication: 2,
      technicalSkills: 4,
      problemSolving: 3,
      teamwork: 2,
      customerService: 3,
    },
    comments:
      "Pierre needs to improve his communication and teamwork. Technical skills are good but could be better utilized with improved collaboration.",
    status: "Reviewed",
    createdBy: "Manager",
  },
  {
    id: "4",
    employeeId: "104",
    employeeName: "Sophie Dubois",
    type: "Self",
    date: "2023-07-05",
    periodStart: "2023-01-01",
    periodEnd: "2023-06-30",
    scores: {
      communication: 4,
      technicalSkills: 3,
      problemSolving: 4,
      teamwork: 5,
      customerService: 5,
    },
    comments:
      "I feel I've made significant improvements in customer service and teamwork. I'd like to focus on enhancing my technical skills in the coming months.",
    status: "Draft",
    createdBy: "Employee",
  },
  {
    id: "5",
    employeeId: "105",
    employeeName: "Lucas Moreau",
    type: "Manager",
    date: "2023-06-30",
    periodStart: "2023-01-01",
    periodEnd: "2023-06-30",
    scores: {
      communication: 5,
      technicalSkills: 5,
      problemSolving: 5,
      teamwork: 4,
      customerService: 5,
    },
    comments:
      "Lucas has demonstrated exceptional performance across all areas. His technical expertise and customer service skills are particularly noteworthy.",
    status: "Reviewed",
    createdBy: "Manager",
  },
]

