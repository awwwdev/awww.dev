export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin: {
        Row: {
          adminEmail_dep: string | null
          adminName_dep: string | null
          created_at: string | null
          hasAccessManagementAccess: boolean | null
          hasBlogManagementAccess: boolean | null
          hasMasterDataAccess: boolean | null
          hasReportsAccess: boolean | null
          hasUserManagementAccess: boolean | null
          hasVisitLogsAccess: boolean | null
          id: string
          idInSheet: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          adminEmail_dep?: string | null
          adminName_dep?: string | null
          created_at?: string | null
          hasAccessManagementAccess?: boolean | null
          hasBlogManagementAccess?: boolean | null
          hasMasterDataAccess?: boolean | null
          hasReportsAccess?: boolean | null
          hasUserManagementAccess?: boolean | null
          hasVisitLogsAccess?: boolean | null
          id: string
          idInSheet?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          adminEmail_dep?: string | null
          adminName_dep?: string | null
          created_at?: string | null
          hasAccessManagementAccess?: boolean | null
          hasBlogManagementAccess?: boolean | null
          hasMasterDataAccess?: boolean | null
          hasReportsAccess?: boolean | null
          hasUserManagementAccess?: boolean | null
          hasVisitLogsAccess?: boolean | null
          id?: string
          idInSheet?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          created_at: string
          id: number
          level: number | null
          name: string | null
          nameFa: string | null
          parentId: number | null
          youngParentId: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          level?: number | null
          name?: string | null
          nameFa?: string | null
          parentId?: number | null
          youngParentId?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          level?: number | null
          name?: string | null
          nameFa?: string | null
          parentId?: number | null
          youngParentId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "category_parentId_fkey"
            columns: ["parentId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_youngParentId_fkey"
            columns: ["youngParentId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
        ]
      }
      coupon: {
        Row: {
          code: string
          condition: Json | null
          created_at: string
          id: number
        }
        Insert: {
          code: string
          condition?: Json | null
          created_at?: string
          id?: number
        }
        Update: {
          code?: string
          condition?: Json | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      course: {
        Row: {
          created_at: string
          id: number
          idInSheet: string | null
          introductionDate: string | null
          introductionStatus: string | null
          isDisabled: boolean | null
          isHelpNeeded_dep: boolean | null
          isHidden: boolean
          isWorkshop: boolean
          newFeedbackFormHyperlink: string | null
          newFeedbackFormRawUrl: string | null
          numberOfStudents: number
          payerId: string
          progressReport: string | null
          rateOverwrite: number | null
          reasonForUnsuccessfulIntroduction: string | null
          requestDate: string
          requestedSessionDurationInMinute: number
          requestMessage: string | null
          teacherId: string
          topicId: number
          topicsCovered: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          idInSheet?: string | null
          introductionDate?: string | null
          introductionStatus?: string | null
          isDisabled?: boolean | null
          isHelpNeeded_dep?: boolean | null
          isHidden?: boolean
          isWorkshop?: boolean
          newFeedbackFormHyperlink?: string | null
          newFeedbackFormRawUrl?: string | null
          numberOfStudents?: number
          payerId: string
          progressReport?: string | null
          rateOverwrite?: number | null
          reasonForUnsuccessfulIntroduction?: string | null
          requestDate: string
          requestedSessionDurationInMinute: number
          requestMessage?: string | null
          teacherId: string
          topicId: number
          topicsCovered?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          idInSheet?: string | null
          introductionDate?: string | null
          introductionStatus?: string | null
          isDisabled?: boolean | null
          isHelpNeeded_dep?: boolean | null
          isHidden?: boolean
          isWorkshop?: boolean
          newFeedbackFormHyperlink?: string | null
          newFeedbackFormRawUrl?: string | null
          numberOfStudents?: number
          payerId?: string
          progressReport?: string | null
          rateOverwrite?: number | null
          reasonForUnsuccessfulIntroduction?: string | null
          requestDate?: string
          requestedSessionDurationInMinute?: number
          requestMessage?: string | null
          teacherId?: string
          topicId?: number
          topicsCovered?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
        ]
      }
      courseStudent: {
        Row: {
          courseId: number
          created_at: string | null
          exitDate: string | null
          groupIdInSheet: string | null
          id: number
          joinDate: string | null
          payerId: string | null
          studentId: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          courseId: number
          created_at?: string | null
          exitDate?: string | null
          groupIdInSheet?: string | null
          id?: number
          joinDate?: string | null
          payerId?: string | null
          studentId?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string | null
          exitDate?: string | null
          groupIdInSheet?: string | null
          id?: number
          joinDate?: string | null
          payerId?: string | null
          studentId?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courseStudent_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courseStudent_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "courseStudent_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courseStudent_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courseStudent_studentId_fkey"
            columns: ["studentId"]
            isOneToOne: false
            referencedRelation: "student"
            referencedColumns: ["id"]
          },
        ]
      }
      currencyExchangeRate: {
        Row: {
          CADtoIRR: number
          created_at: string | null
          endDate: string | null
          id: number
          idInSheet: string | null
          monthInSheet: string
          startDate: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          CADtoIRR: number
          created_at?: string | null
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          monthInSheet: string
          startDate?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          CADtoIRR?: number
          created_at?: string | null
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          monthInSheet?: string
          startDate?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      dashboardGeneralMailLog: {
        Row: {
          courseId: number
          created_at: string
          date: string
          emailBody: string
          id: number
          isArchived: boolean
          packagePurchasedId: number
          payerId: string | null
        }
        Insert: {
          courseId: number
          created_at?: string
          date: string
          emailBody: string
          id?: number
          isArchived?: boolean
          packagePurchasedId: number
          payerId?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string
          date?: string
          emailBody?: string
          id?: number
          isArchived?: boolean
          packagePurchasedId?: number
          payerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dashboardGeneralMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboardGeneralMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "dashboardGeneralMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboardGeneralMailLog_packagePurchasedId_fkey"
            columns: ["packagePurchasedId"]
            isOneToOne: false
            referencedRelation: "packagePurchased"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dashboardGeneralMailLog_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      dashboardVisitLog: {
        Row: {
          created_at: string
          id: number
          userId: string
        }
        Insert: {
          created_at?: string
          id?: number
          userId: string
        }
        Update: {
          created_at?: string
          id?: number
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "dashboardVisitLog_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      discount: {
        Row: {
          code: string
          constantAmountInCAD: number | null
          created_at: string
          endDate: string | null
          id: number
          name: string
          percentage: number | null
          promotionType: string
          startDate: string
        }
        Insert: {
          code: string
          constantAmountInCAD?: number | null
          created_at?: string
          endDate?: string | null
          id?: number
          name: string
          percentage?: number | null
          promotionType: string
          startDate: string
        }
        Update: {
          code?: string
          constantAmountInCAD?: number | null
          created_at?: string
          endDate?: string | null
          id?: number
          name?: string
          percentage?: number | null
          promotionType?: string
          startDate?: string
        }
        Relationships: []
      }
      expertise: {
        Row: {
          created_at: string
          endDate: string | null
          id: number
          idInSheet: string | null
          sessionDurationOnWebsiteInMinute: number
          sessionPriceInCAD: number
          startDate: string
          teacherEmail_dep: string | null
          teacherId: string
          teacherName_dep: string | null
          topicId: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          sessionDurationOnWebsiteInMinute: number
          sessionPriceInCAD: number
          startDate: string
          teacherEmail_dep?: string | null
          teacherId: string
          teacherName_dep?: string | null
          topicId: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          sessionDurationOnWebsiteInMinute?: number
          sessionPriceInCAD?: number
          startDate?: string
          teacherEmail_dep?: string | null
          teacherId?: string
          teacherName_dep?: string | null
          topicId?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expertise_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expertise_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          courseId: number
          created_at: string
          id: number
          idInSheet: string | null
          payerId: string | null
          studentFeedback: string | null
          studentRating: number
          updated_at: string | null
          updated_by: string | null
          visibleInSite: boolean | null
        }
        Insert: {
          courseId: number
          created_at?: string
          id?: number
          idInSheet?: string | null
          payerId?: string | null
          studentFeedback?: string | null
          studentRating: number
          updated_at?: string | null
          updated_by?: string | null
          visibleInSite?: boolean | null
        }
        Update: {
          courseId?: number
          created_at?: string
          id?: number
          idInSheet?: string | null
          payerId?: string | null
          studentFeedback?: string | null
          studentRating?: number
          updated_at?: string | null
          updated_by?: string | null
          visibleInSite?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "feedback_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbackRequestMailLog: {
        Row: {
          courseId: number
          created_at: string
          date: string
          emailBody: string
          id: number
          isArchived: boolean
          packagePurchasedId: number
          payerId: string | null
        }
        Insert: {
          courseId: number
          created_at?: string
          date: string
          emailBody: string
          id?: number
          isArchived?: boolean
          packagePurchasedId: number
          payerId?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string
          date?: string
          emailBody?: string
          id?: number
          isArchived?: boolean
          packagePurchasedId?: number
          payerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_feedbackRequestMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbackRequestMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "public_feedbackRequestMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbackRequestMailLog_packagePurchasedId_fkey"
            columns: ["packagePurchasedId"]
            isOneToOne: false
            referencedRelation: "packagePurchased"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_feedbackRequestMailLog_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      giftForTeacher: {
        Row: {
          amountInCAD: number
          created_at: string
          date: string
          id: number
          idInSheet: string | null
          payerId: string | null
          reason: string
          teacherId: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amountInCAD: number
          created_at?: string
          date: string
          id?: number
          idInSheet?: string | null
          payerId?: string | null
          reason: string
          teacherId: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amountInCAD?: number
          created_at?: string
          date?: string
          id?: number
          idInSheet?: string | null
          payerId?: string | null
          reason?: string
          teacherId?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "giftForTeacher_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "giftForTeacher_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      introMeetingMailLog: {
        Row: {
          courseId: number
          created_at: string
          date: string
          emailBody: string
          id: number
          isArchived: boolean
          payerId: string | null
        }
        Insert: {
          courseId: number
          created_at?: string
          date: string
          emailBody: string
          id?: number
          isArchived?: boolean
          payerId?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string
          date?: string
          emailBody?: string
          id?: number
          isArchived?: boolean
          payerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "introMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "introMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "introMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "introMeetingMailLog_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      newIntroMeetingMailLog: {
        Row: {
          courseId: number
          created_at: string
          date: string
          emailBody: string
          id: number
          isArchived: boolean
        }
        Insert: {
          courseId: number
          created_at?: string
          date: string
          emailBody: string
          id?: number
          isArchived?: boolean
        }
        Update: {
          courseId?: number
          created_at?: string
          date?: string
          emailBody?: string
          id?: number
          isArchived?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "newIntroMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newIntroMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "newIntroMeetingMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
        ]
      }
      packagePurchased: {
        Row: {
          courseId: number
          created_at: string
          datePackagePurchased: string
          expertiseId: number
          id: number
          idInSheet: string | null
          numberOfSessions: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          courseId: number
          created_at?: string
          datePackagePurchased: string
          expertiseId: number
          id?: number
          idInSheet?: string | null
          numberOfSessions: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string
          datePackagePurchased?: string
          expertiseId?: number
          id?: number
          idInSheet?: string | null
          numberOfSessions?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packagePurchased_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packagePurchased_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "packagePurchased_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packagePurchased_expertiseId_fkey"
            columns: ["expertiseId"]
            isOneToOne: false
            referencedRelation: "expertise"
            referencedColumns: ["id"]
          },
        ]
      }
      payer: {
        Row: {
          created_at: string | null
          dashboardLink: string | null
          howLearnedAboutUs: string | null
          id: string
          idInStudentSheet: string | null
          name: string | null
          payerEmail_dep: string | null
          payerName_dep: string | null
          secondPayerName: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          dashboardLink?: string | null
          howLearnedAboutUs?: string | null
          id: string
          idInStudentSheet?: string | null
          name?: string | null
          payerEmail_dep?: string | null
          payerName_dep?: string | null
          secondPayerName?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          dashboardLink?: string | null
          howLearnedAboutUs?: string | null
          id?: string
          idInStudentSheet?: string | null
          name?: string | null
          payerEmail_dep?: string | null
          payerName_dep?: string | null
          secondPayerName?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payer_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      paymentByPayer: {
        Row: {
          amountActuallyPaidInCAD: number | null
          amountBeforeDiscountsInCAD: number
          created_at: string
          date: string
          id: number
          idInSheet: string | null
          method: string
          nameOnTheCard: string | null
          payerId: string
          paymentDetails: string | null
          promotionId: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amountActuallyPaidInCAD?: number | null
          amountBeforeDiscountsInCAD: number
          created_at?: string
          date: string
          id?: number
          idInSheet?: string | null
          method: string
          nameOnTheCard?: string | null
          payerId: string
          paymentDetails?: string | null
          promotionId?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amountActuallyPaidInCAD?: number | null
          amountBeforeDiscountsInCAD?: number
          created_at?: string
          date?: string
          id?: number
          idInSheet?: string | null
          method?: string
          nameOnTheCard?: string | null
          payerId?: string
          paymentDetails?: string | null
          promotionId?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paymentByPayer_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paymentByPayer_promotionId_fkey"
            columns: ["promotionId"]
            isOneToOne: false
            referencedRelation: "promotion"
            referencedColumns: ["id"]
          },
        ]
      }
      paymentToTeacher: {
        Row: {
          amountPayedInCAD: number | null
          amountPayedInIRR: number | null
          correctionAmountInCAD: number | null
          created_at: string | null
          currencyExchangeRateId: number | null
          date: string | null
          description: string | null
          id: number
          idInSheet: string | null
          isAutoExchangeRateId: boolean | null
          paymentConfirmation: string | null
          teacherId: string
          totalAmountInCAD: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          amountPayedInCAD?: number | null
          amountPayedInIRR?: number | null
          correctionAmountInCAD?: number | null
          created_at?: string | null
          currencyExchangeRateId?: number | null
          date?: string | null
          description?: string | null
          id?: number
          idInSheet?: string | null
          isAutoExchangeRateId?: boolean | null
          paymentConfirmation?: string | null
          teacherId: string
          totalAmountInCAD: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          amountPayedInCAD?: number | null
          amountPayedInIRR?: number | null
          correctionAmountInCAD?: number | null
          created_at?: string | null
          currencyExchangeRateId?: number | null
          date?: string | null
          description?: string | null
          id?: number
          idInSheet?: string | null
          isAutoExchangeRateId?: boolean | null
          paymentConfirmation?: string | null
          teacherId?: string
          totalAmountInCAD?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paymentToTeacher_currencyExchangeRateId_fkey"
            columns: ["currencyExchangeRateId"]
            isOneToOne: false
            referencedRelation: "currencyExchangeRate"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paymentToTeacher_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      post: {
        Row: {
          author: string | null
          content: Json | null
          contentFa: Json | null
          created_at: string
          date: string | null
          featuredImage: string | null
          id: number
          slug: string
          subtitle: string | null
          subtitleFa: string | null
          title: string | null
          titleFa: string | null
          viewCount: number
        }
        Insert: {
          author?: string | null
          content?: Json | null
          contentFa?: Json | null
          created_at?: string
          date?: string | null
          featuredImage?: string | null
          id?: number
          slug: string
          subtitle?: string | null
          subtitleFa?: string | null
          title?: string | null
          titleFa?: string | null
          viewCount?: number
        }
        Update: {
          author?: string | null
          content?: Json | null
          contentFa?: Json | null
          created_at?: string
          date?: string | null
          featuredImage?: string | null
          id?: number
          slug?: string
          subtitle?: string | null
          subtitleFa?: string | null
          title?: string | null
          titleFa?: string | null
          viewCount?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_post_created_by_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      profileSubcategory: {
        Row: {
          categoryId: number | null
          created_at: string
          id: number
          siteProfileId: number | null
          teacherId: string | null
        }
        Insert: {
          categoryId?: number | null
          created_at?: string
          id?: number
          siteProfileId?: number | null
          teacherId?: string | null
        }
        Update: {
          categoryId?: number | null
          created_at?: string
          id?: number
          siteProfileId?: number | null
          teacherId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profileSubcategory_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileSubcategory_siteProfileId_fkey"
            columns: ["siteProfileId"]
            isOneToOne: false
            referencedRelation: "siteProfile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profileSubcategory_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion: {
        Row: {
          constantAmountInCAD: number | null
          created_at: string
          endDate: string | null
          id: number
          idInSheet: string | null
          name: string
          percentage: number | null
          promotionType: string
          startDate: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          constantAmountInCAD?: number | null
          created_at?: string
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          name: string
          percentage?: number | null
          promotionType: string
          startDate: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          constantAmountInCAD?: number | null
          created_at?: string
          endDate?: string | null
          id?: number
          idInSheet?: string | null
          name?: string
          percentage?: number | null
          promotionType?: string
          startDate?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      session: {
        Row: {
          addedByTeacherId: string | null
          adminComment: string | null
          approvedBy: string | null
          calculatedCost_helper: number | null
          courseId: number
          created_at: string
          date: string
          id: number
          idInSheet: string | null
          isActionDoneByTeacher: boolean
          isApproved: boolean | null
          isHeld: string
          packagePurchasedId: number | null
          rateMultiplierInSheet: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          addedByTeacherId?: string | null
          adminComment?: string | null
          approvedBy?: string | null
          calculatedCost_helper?: number | null
          courseId: number
          created_at?: string
          date: string
          id?: number
          idInSheet?: string | null
          isActionDoneByTeacher?: boolean
          isApproved?: boolean | null
          isHeld: string
          packagePurchasedId?: number | null
          rateMultiplierInSheet?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          addedByTeacherId?: string | null
          adminComment?: string | null
          approvedBy?: string | null
          calculatedCost_helper?: number | null
          courseId?: number
          created_at?: string
          date?: string
          id?: number
          idInSheet?: string | null
          isActionDoneByTeacher?: boolean
          isApproved?: boolean | null
          isHeld?: string
          packagePurchasedId?: number | null
          rateMultiplierInSheet?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_packagePurchasedId_fkey"
            columns: ["packagePurchasedId"]
            isOneToOne: false
            referencedRelation: "packagePurchased"
            referencedColumns: ["id"]
          },
        ]
      }
      siteProfile: {
        Row: {
          about: string | null
          availability: string | null
          categoryId: number | null
          created_at: string
          education: string | null
          enProfile: boolean | null
          id: number
          isActive: boolean | null
          isBuyButtonActive: boolean | null
          isTeacherIn: boolean | null
          languageSkills: string | null
          languageTeachingLevel: string | null
          publicExperience: string | null
          status: string | null
          studentRange: string[] // manually changed from Json | null to string[]
          studentRange_old: string | null
          teacherId: string | null
          teachingMethod: string | null
          topicId: number | null
        }
        Insert: {
          about?: string | null
          availability?: string | null
          categoryId?: number | null
          created_at?: string
          education?: string | null
          enProfile?: boolean | null
          id?: number
          isActive?: boolean | null
          isBuyButtonActive?: boolean | null
          isTeacherIn?: boolean | null
          languageSkills?: string | null
          languageTeachingLevel?: string | null
          publicExperience?: string | null
          status?: string | null
          studentRange?: Json | null
          studentRange_old?: string | null
          teacherId?: string | null
          teachingMethod?: string | null
          topicId?: number | null
        }
        Update: {
          about?: string | null
          availability?: string | null
          categoryId?: number | null
          created_at?: string
          education?: string | null
          enProfile?: boolean | null
          id?: number
          isActive?: boolean | null
          isBuyButtonActive?: boolean | null
          isTeacherIn?: boolean | null
          languageSkills?: string | null
          languageTeachingLevel?: string | null
          publicExperience?: string | null
          status?: string | null
          studentRange?: Json | null
          studentRange_old?: string | null
          teacherId?: string | null
          teachingMethod?: string | null
          topicId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "siteProfile_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "siteProfile_teacherId_fkey"
            columns: ["teacherId"]
            isOneToOne: false
            referencedRelation: "teacher"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "siteProfile_topicId_fkey"
            columns: ["topicId"]
            isOneToOne: false
            referencedRelation: "topic"
            referencedColumns: ["id"]
          },
        ]
      }
      student: {
        Row: {
          created_at: string | null
          dateJoined: string
          id: string
          idInSheet: string | null
          payerId: string | null
          studentEmail_dep: string | null
          studentName_dep: string | null
          studentPayerEmail_dep: string | null
          studentPayerName_dep: string | null
          updated_at: string | null
          updated_by: string | null
          yearOfBirth: number | null
        }
        Insert: {
          created_at?: string | null
          dateJoined: string
          id: string
          idInSheet?: string | null
          payerId?: string | null
          studentEmail_dep?: string | null
          studentName_dep?: string | null
          studentPayerEmail_dep?: string | null
          studentPayerName_dep?: string | null
          updated_at?: string | null
          updated_by?: string | null
          yearOfBirth?: number | null
        }
        Update: {
          created_at?: string | null
          dateJoined?: string
          id?: string
          idInSheet?: string | null
          payerId?: string | null
          studentEmail_dep?: string | null
          studentName_dep?: string | null
          studentPayerEmail_dep?: string | null
          studentPayerName_dep?: string | null
          updated_at?: string | null
          updated_by?: string | null
          yearOfBirth?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "student_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher: {
        Row: {
          about: string | null
          address: string | null
          addressFa: string | null
          availability: string | null
          commissionPercentage: number | null
          created_at: string | null
          currencyPrefered: string | null
          dateJoined: string | null
          education: string | null
          englishFluency: string | null
          enProfile: boolean | null
          id: string
          idInSheet: string | null
          invoiceSubmitted: boolean
          isActive: boolean
          isBuyButtonActive: boolean | null
          isTeacherIn: boolean | null
          languageSkills: string | null
          languageTeachingLevel: string | null
          paymentDetails: string | null
          paymentMethod: string | null
          profileLink: string | null
          publicExperience: string | null
          status: string | null
          studentRange: string | null
          teacherEmail_dep: string | null
          teacherName_dep: string | null
          teachingMethod: string | null
          updated_at: string | null
          updated_by: string | null
          wixProfileNumber: number | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          addressFa?: string | null
          availability?: string | null
          commissionPercentage?: number | null
          created_at?: string | null
          currencyPrefered?: string | null
          dateJoined?: string | null
          education?: string | null
          englishFluency?: string | null
          enProfile?: boolean | null
          id: string
          idInSheet?: string | null
          invoiceSubmitted?: boolean
          isActive: boolean
          isBuyButtonActive?: boolean | null
          isTeacherIn?: boolean | null
          languageSkills?: string | null
          languageTeachingLevel?: string | null
          paymentDetails?: string | null
          paymentMethod?: string | null
          profileLink?: string | null
          publicExperience?: string | null
          status?: string | null
          studentRange?: string | null
          teacherEmail_dep?: string | null
          teacherName_dep?: string | null
          teachingMethod?: string | null
          updated_at?: string | null
          updated_by?: string | null
          wixProfileNumber?: number | null
        }
        Update: {
          about?: string | null
          address?: string | null
          addressFa?: string | null
          availability?: string | null
          commissionPercentage?: number | null
          created_at?: string | null
          currencyPrefered?: string | null
          dateJoined?: string | null
          education?: string | null
          englishFluency?: string | null
          enProfile?: boolean | null
          id?: string
          idInSheet?: string | null
          invoiceSubmitted?: boolean
          isActive?: boolean
          isBuyButtonActive?: boolean | null
          isTeacherIn?: boolean | null
          languageSkills?: string | null
          languageTeachingLevel?: string | null
          paymentDetails?: string | null
          paymentMethod?: string | null
          profileLink?: string | null
          publicExperience?: string | null
          status?: string | null
          studentRange?: string | null
          teacherEmail_dep?: string | null
          teacherName_dep?: string | null
          teachingMethod?: string | null
          updated_at?: string | null
          updated_by?: string | null
          wixProfileNumber?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      teacherAddress: {
        Row: {
          address: string | null
          addressFa: string | null
          created_at: string
          email: string | null
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          addressFa?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          addressFa?: string | null
          created_at?: string
          email?: string | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      topic: {
        Row: {
          category: string
          created_at: string
          id: number
          idInSheet: string | null
          name: string
          nameFa: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          idInSheet?: string | null
          name: string
          nameFa: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          idInSheet?: string | null
          name?: string
          nameFa?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      tutorApplication: {
        Row: {
          ageGroup: string
          created_at: string
          degreeOfEducation: string | null
          duration: number
          email: string
          englishLevel: string | null
          foreignTeachingExperience: string | null
          fullName: string
          honors: string | null
          howLearnedAboutUs: string
          id: number
          note: string | null
          onlineTeachingExperience: string | null
          phone: string
          price: number
          socialMedia: string | null
          subject: string
          teachingExperience: string
        }
        Insert: {
          ageGroup: string
          created_at?: string
          degreeOfEducation?: string | null
          duration: number
          email: string
          englishLevel?: string | null
          foreignTeachingExperience?: string | null
          fullName: string
          honors?: string | null
          howLearnedAboutUs: string
          id?: number
          note?: string | null
          onlineTeachingExperience?: string | null
          phone: string
          price: number
          socialMedia?: string | null
          subject: string
          teachingExperience: string
        }
        Update: {
          ageGroup?: string
          created_at?: string
          degreeOfEducation?: string | null
          duration?: number
          email?: string
          englishLevel?: string | null
          foreignTeachingExperience?: string | null
          fullName?: string
          honors?: string | null
          howLearnedAboutUs?: string
          id?: number
          note?: string | null
          onlineTeachingExperience?: string | null
          phone?: string
          price?: number
          socialMedia?: string | null
          subject?: string
          teachingExperience?: string
        }
        Relationships: []
      }
      unpaidSessionMailLog: {
        Row: {
          courseId: number
          created_at: string
          date: string
          emailBody: string | null
          id: number
          isArchived: boolean
          payerId: string | null
          remainingSession: number
        }
        Insert: {
          courseId: number
          created_at?: string
          date: string
          emailBody?: string | null
          id?: number
          isArchived?: boolean
          payerId?: string | null
          remainingSession: number
        }
        Update: {
          courseId?: number
          created_at?: string
          date?: string
          emailBody?: string | null
          id?: number
          isArchived?: boolean
          payerId?: string | null
          remainingSession?: number
        }
        Relationships: [
          {
            foreignKeyName: "unpaidSessionMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unpaidSessionMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "unpaidSessionMailLog_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "unpaidSessionMailLog_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          authUserId: string
          countryCode: string | null
          created_at: string
          email: string
          firstname: string
          firstnameFa: string
          id: string
          isAuditRequiredForNames: boolean | null
          lastname: string
          lastnameFa: string
          name: string | null
          name_dep: string | null
          nameFa: string | null
          nameFa_dep: string | null
          phone: string | null
          phoneCountryCode: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          authUserId: string
          countryCode?: string | null
          created_at?: string
          email: string
          firstname: string
          firstnameFa: string
          id: string
          isAuditRequiredForNames?: boolean | null
          lastname: string
          lastnameFa: string
          name?: string | null
          name_dep?: string | null
          nameFa?: string | null
          nameFa_dep?: string | null
          phone?: string | null
          phoneCountryCode?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          authUserId?: string
          countryCode?: string | null
          created_at?: string
          email?: string
          firstname?: string
          firstnameFa?: string
          id?: string
          isAuditRequiredForNames?: boolean | null
          lastname?: string
          lastnameFa?: string
          name?: string | null
          name_dep?: string | null
          nameFa?: string | null
          nameFa_dep?: string | null
          phone?: string | null
          phoneCountryCode?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_authUserId_fkey"
            columns: ["authUserId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      workshopInfo: {
        Row: {
          courseId: number
          created_at: string
          description: string
          from: string
          id: number
          name: string
          price: number | null
          to: string | null
        }
        Insert: {
          courseId: number
          created_at?: string
          description: string
          from: string
          id?: number
          name: string
          price?: number | null
          to?: string | null
        }
        Update: {
          courseId?: number
          created_at?: string
          description?: string
          from?: string
          id?: number
          name?: string
          price?: number | null
          to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_workshopInfo_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_workshopInfo_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "public_workshopInfo_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      course_norr: {
        Row: {
          course_id: number | null
          norr: string | null
          requestDate: string | null
        }
        Relationships: []
      }
      course_view: {
        Row: {
          id: number | null
          payerId: string | null
        }
        Insert: {
          id?: number | null
          payerId?: string | null
        }
        Update: {
          id?: number | null
          payerId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      indexes: {
        Row: {
          indexdef: string | null
          indexname: unknown | null
          schemaname: unknown | null
          tablename: unknown | null
          tablespace: unknown | null
        }
        Relationships: []
      }
      monitor: {
        Row: {
          application_name: string | null
          blk_read_time: number | null
          blk_write_time: number | null
          bucket: number | null
          bucket_start_time: string | null
          calls: number | null
          client_ip: unknown | null
          cmd_type: number | null
          cmd_type_text: string | null
          comments: string | null
          cpu_sys_time: number | null
          cpu_user_time: number | null
          datname: unknown | null
          elevel: number | null
          local_blks_dirtied: number | null
          local_blks_hit: number | null
          local_blks_read: number | null
          local_blks_written: number | null
          max_exec_time: number | null
          max_plan_time: number | null
          mean_exec_time: number | null
          mean_plan_time: number | null
          message: string | null
          min_exec_time: number | null
          min_plan_time: number | null
          planid: string | null
          plans_calls: number | null
          query: string | null
          query_plan: string | null
          queryid: string | null
          relations: string[] | null
          resp_calls: string[] | null
          rows_retrieved: number | null
          shared_blks_dirtied: number | null
          shared_blks_hit: number | null
          shared_blks_read: number | null
          shared_blks_written: number | null
          sqlcode: string | null
          state: string | null
          state_code: number | null
          stddev_exec_time: number | null
          stddev_plan_time: number | null
          temp_blks_read: number | null
          temp_blks_written: number | null
          top_query: string | null
          top_queryid: string | null
          toplevel: boolean | null
          total_exec_time: number | null
          total_plan_time: number | null
          userid: unknown | null
          wal_bytes: number | null
          wal_fpi: number | null
          wal_records: number | null
        }
        Relationships: []
      }
      monitor_simple: {
        Row: {
          calls: number | null
          max_exec_time: number | null
          mean_exec_time: number | null
          message: string | null
          min_exec_time: number | null
          query: string | null
          rows_retrieved: number | null
          state: string | null
          stddev_exec_time: number | null
          total_exec_time: number | null
        }
        Relationships: []
      }
      payment_norr: {
        Row: {
          amountActuallyPaidInCAD: number | null
          norr: string | null
          payer_created_at: string | null
          payerId: string | null
          payment_date: string | null
          payment_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "paymentByPayer_payerId_fkey"
            columns: ["payerId"]
            isOneToOne: false
            referencedRelation: "payer"
            referencedColumns: ["id"]
          },
        ]
      }
      session_norr: {
        Row: {
          courseId: number | null
          norr: string | null
          session_id: number | null
          sessionDate: string | null
        }
        Relationships: [
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_norr"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "session_courseId_fkey"
            columns: ["courseId"]
            isOneToOne: false
            referencedRelation: "course_view"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
