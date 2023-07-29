declare interface IScoreResponse {
  compulsoryRank: Rank
  calculateLogs: CalculateLog[]
  totalRank: Rank
  semesters: Semester[]
}

interface Rank {
  score: RankInfo
  gpa: RankInfo
  total: number
}

interface RankInfo {
  rank: number
  mine: number
  max: number
  avg: number
  head: number
  actualNum: number
}

interface CalculateLog {
  semesterName: string
  scoreDetails: string[]
}

interface Semester {
  semester: string
  semesterId: number
  compulsoryRank: Rank
  totalRank: Rank
  scores: SemesterScore[]
}

interface SemesterScore {
  name: string
  lessonId: string
  teachingClassId: string
  credit: string
  gpa: string
  score: string
  details: Detail[]
}

interface Detail {
  type: string
  score: string
}
