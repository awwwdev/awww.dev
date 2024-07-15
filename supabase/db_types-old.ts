export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      admin: {
        Row: {
          adminEmail_dep: string | null;
          adminName_dep: string | null;
          created_at: string | null;
          id: string;
          idInSheet: string | null;
        };
        Insert: {
          adminEmail_dep?: string | null;
          adminName_dep?: string | null;
          created_at?: string | null;
          id: string;
          idInSheet?: string | null;
        };
        Update: {
          adminEmail_dep?: string | null;
          adminName_dep?: string | null;
          created_at?: string | null;
          id?: string;
          idInSheet?: string | null;
        };
      };
      course: {
        Row: {
          created_at: string;
          id: number;
          idInSheet: string;
          introductionDate: string | null;
          introductionStatus: string | null;
          isHelpNeeded_dep: boolean | null;
          newFeedbackFormHyperlink: string | null;
          newFeedbackFormRawUrl: string | null;
          payerId: string | null;
          progressReport: string | null;
          rateOverwrite: number | null;
          reasonForUnsuccessfulIntroduction: string | null;
          requestDate: string;
          requestedSessionDurationInMinute: number;
          requestMessage: string | null;
          teacherId: string | null;
          topicId: number | null;
          topicsCovered: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          idInSheet: string;
          introductionDate?: string | null;
          introductionStatus?: string | null;
          isHelpNeeded_dep?: boolean | null;
          newFeedbackFormHyperlink?: string | null;
          newFeedbackFormRawUrl?: string | null;
          payerId?: string | null;
          progressReport?: string | null;
          rateOverwrite?: number | null;
          reasonForUnsuccessfulIntroduction?: string | null;
          requestDate: string;
          requestedSessionDurationInMinute: number;
          requestMessage?: string | null;
          teacherId?: string | null;
          topicId?: number | null;
          topicsCovered?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          idInSheet?: string;
          introductionDate?: string | null;
          introductionStatus?: string | null;
          isHelpNeeded_dep?: boolean | null;
          newFeedbackFormHyperlink?: string | null;
          newFeedbackFormRawUrl?: string | null;
          payerId?: string | null;
          progressReport?: string | null;
          rateOverwrite?: number | null;
          reasonForUnsuccessfulIntroduction?: string | null;
          requestDate?: string;
          requestedSessionDurationInMinute?: number;
          requestMessage?: string | null;
          teacherId?: string | null;
          topicId?: number | null;
          topicsCovered?: string | null;
        };
      };
      courseStudent: {
        Row: {
          courseId: number | null;
          coursePayerId: string | null;
          created_at: string | null;
          exitDate: string | null;
          groupIdInSheet: string | null;
          id: number;
          joinDate: string | null;
          studentId: string | null;
        };
        Insert: {
          courseId?: number | null;
          coursePayerId?: string | null;
          created_at?: string | null;
          exitDate?: string | null;
          groupIdInSheet?: string | null;
          id?: number;
          joinDate?: string | null;
          studentId?: string | null;
        };
        Update: {
          courseId?: number | null;
          coursePayerId?: string | null;
          created_at?: string | null;
          exitDate?: string | null;
          groupIdInSheet?: string | null;
          id?: number;
          joinDate?: string | null;
          studentId?: string | null;
        };
      };
      currencyExchangeRate: {
        Row: {
          CADtoIRR: number;
          created_at: string | null;
          endDate: string | null;
          id: number;
          idInSheet: string;
          monthInSheet: string;
          startDate: string | null;
        };
        Insert: {
          CADtoIRR: number;
          created_at?: string | null;
          endDate?: string | null;
          id?: number;
          idInSheet: string;
          monthInSheet: string;
          startDate?: string | null;
        };
        Update: {
          CADtoIRR?: number;
          created_at?: string | null;
          endDate?: string | null;
          id?: number;
          idInSheet?: string;
          monthInSheet?: string;
          startDate?: string | null;
        };
      };
      expertise: {
        Row: {
          created_at: string;
          endDate: string | null;
          id: number;
          idInSheet: string;
          sessionDurationOnWebsiteInMinute: number;
          sessionPriceInCAD: number;
          startDate: string;
          teacherEmail_dep: string | null;
          teacherId: string | null;
          teacherName_dep: string | null;
          topicId: number | null;
        };
        Insert: {
          created_at?: string;
          endDate?: string | null;
          id?: number;
          idInSheet: string;
          sessionDurationOnWebsiteInMinute: number;
          sessionPriceInCAD: number;
          startDate: string;
          teacherEmail_dep?: string | null;
          teacherId?: string | null;
          teacherName_dep?: string | null;
          topicId?: number | null;
        };
        Update: {
          created_at?: string;
          endDate?: string | null;
          id?: number;
          idInSheet?: string;
          sessionDurationOnWebsiteInMinute?: number;
          sessionPriceInCAD?: number;
          startDate?: string;
          teacherEmail_dep?: string | null;
          teacherId?: string | null;
          teacherName_dep?: string | null;
          topicId?: number | null;
        };
      };
      feedback: {
        Row: {
          created_at: string;
          expertiseId: number | null;
          id: number;
          idInSheet: string;
          isVisibleInPublicWebsite: boolean | null;
          isVisibleInTeacherDashboard: boolean | null;
          packagePurchasedId: number | null;
          studentFeedback: string | null;
          studentId: string | null;
          studentRating: number;
          teacherId: string | null;
        };
        Insert: {
          created_at?: string;
          expertiseId?: number | null;
          id?: number;
          idInSheet: string;
          isVisibleInPublicWebsite?: boolean | null;
          isVisibleInTeacherDashboard?: boolean | null;
          packagePurchasedId?: number | null;
          studentFeedback?: string | null;
          studentId?: string | null;
          studentRating: number;
          teacherId?: string | null;
        };
        Update: {
          created_at?: string;
          expertiseId?: number | null;
          id?: number;
          idInSheet?: string;
          isVisibleInPublicWebsite?: boolean | null;
          isVisibleInTeacherDashboard?: boolean | null;
          packagePurchasedId?: number | null;
          studentFeedback?: string | null;
          studentId?: string | null;
          studentRating?: number;
          teacherId?: string | null;
        };
      };
      giftForTeacher: {
        Row: {
          amountInCAD: number;
          created_at: string;
          date: string;
          id: number;
          idInSheet: string;
          payerId: string | null;
          reason: string;
          teacherId: string | null;
        };
        Insert: {
          amountInCAD: number;
          created_at?: string;
          date: string;
          id?: number;
          idInSheet: string;
          payerId?: string | null;
          reason: string;
          teacherId?: string | null;
        };
        Update: {
          amountInCAD?: number;
          created_at?: string;
          date?: string;
          id?: number;
          idInSheet?: string;
          payerId?: string | null;
          reason?: string;
          teacherId?: string | null;
        };
      };
      packagePurchased: {
        Row: {
          courseId: number | null;
          created_at: string;
          datePackagePurchased: string;
          expertiseId: number | null;
          id: number;
          idInSheet: string;
          numberOfSessions: number;
        };
        Insert: {
          courseId?: number | null;
          created_at?: string;
          datePackagePurchased: string;
          expertiseId?: number | null;
          id?: number;
          idInSheet: string;
          numberOfSessions: number;
        };
        Update: {
          courseId?: number | null;
          created_at?: string;
          datePackagePurchased?: string;
          expertiseId?: number | null;
          id?: number;
          idInSheet?: string;
          numberOfSessions?: number;
        };
      };
      payer: {
        Row: {
          created_at: string | null;
          dashboardLink: string | null;
          howLearnedAboutUs: string | null;
          id: string;
          idInStudentSheet: string | null;
          name: string | null;
          payerEmail_dep: string | null;
          payerName_dep: string | null;
          secondPayerName: string | null;
        };
        Insert: {
          created_at?: string | null;
          dashboardLink?: string | null;
          howLearnedAboutUs?: string | null;
          id: string;
          idInStudentSheet?: string | null;
          name?: string | null;
          payerEmail_dep?: string | null;
          payerName_dep?: string | null;
          secondPayerName?: string | null;
        };
        Update: {
          created_at?: string | null;
          dashboardLink?: string | null;
          howLearnedAboutUs?: string | null;
          id?: string;
          idInStudentSheet?: string | null;
          name?: string | null;
          payerEmail_dep?: string | null;
          payerName_dep?: string | null;
          secondPayerName?: string | null;
        };
      };
      paymentByPayer: {
        Row: {
          amountActuallyPaidInCAD: number | null;
          amountBeforeDiscountsInCAD: number;
          created_at: string;
          date: string;
          id: number;
          idInSheet: string;
          method: string;
          nameOnTheCard: string | null;
          payerId: string | null;
          paymentDetails: string | null;
          promotionId: number | null;
        };
        Insert: {
          amountActuallyPaidInCAD?: number | null;
          amountBeforeDiscountsInCAD: number;
          created_at?: string;
          date: string;
          id?: number;
          idInSheet: string;
          method: string;
          nameOnTheCard?: string | null;
          payerId?: string | null;
          paymentDetails?: string | null;
          promotionId?: number | null;
        };
        Update: {
          amountActuallyPaidInCAD?: number | null;
          amountBeforeDiscountsInCAD?: number;
          created_at?: string;
          date?: string;
          id?: number;
          idInSheet?: string;
          method?: string;
          nameOnTheCard?: string | null;
          payerId?: string | null;
          paymentDetails?: string | null;
          promotionId?: number | null;
        };
      };
      paymentToTeacher: {
        Row: {
          amountPayedInCAD: number | null;
          amountPayedInIRR: number | null;
          created_at: string | null;
          currencyExchangeRateId: number | null;
          date: string | null;
          description: string | null;
          id: number;
          idInSheet: string;
          isAutoExchangeRateId: boolean | null;
          paymentConfirmation: string | null;
          teacherId: string | null;
          totalAmountInCAD: number;
        };
        Insert: {
          amountPayedInCAD?: number | null;
          amountPayedInIRR?: number | null;
          created_at?: string | null;
          currencyExchangeRateId?: number | null;
          date?: string | null;
          description?: string | null;
          id?: number;
          idInSheet: string;
          isAutoExchangeRateId?: boolean | null;
          paymentConfirmation?: string | null;
          teacherId?: string | null;
          totalAmountInCAD: number;
        };
        Update: {
          amountPayedInCAD?: number | null;
          amountPayedInIRR?: number | null;
          created_at?: string | null;
          currencyExchangeRateId?: number | null;
          date?: string | null;
          description?: string | null;
          id?: number;
          idInSheet?: string;
          isAutoExchangeRateId?: boolean | null;
          paymentConfirmation?: string | null;
          teacherId?: string | null;
          totalAmountInCAD?: number;
        };
      };
      promotion: {
        Row: {
          constantAmountInCAD: number | null;
          created_at: string;
          endDate: string | null;
          id: number;
          idInSheet: string;
          name: string;
          percentage: number | null;
          promotionType: string;
          startDate: string;
        };
        Insert: {
          constantAmountInCAD?: number | null;
          created_at?: string;
          endDate?: string | null;
          id?: number;
          idInSheet: string;
          name: string;
          percentage?: number | null;
          promotionType: string;
          startDate: string;
        };
        Update: {
          constantAmountInCAD?: number | null;
          created_at?: string;
          endDate?: string | null;
          id?: number;
          idInSheet?: string;
          name?: string;
          percentage?: number | null;
          promotionType?: string;
          startDate?: string;
        };
      };
      session: {
        Row: {
          calculatedCost_helper: number | null;
          courseId: number | null;
          created_at: string;
          date: string;
          id: number;
          idInSheet: string;
          isHeld: string;
          packagePurchasedId: number | null;
          rateMultiplierInSheet: number | null;
        };
        Insert: {
          calculatedCost_helper?: number | null;
          courseId?: number | null;
          created_at?: string;
          date: string;
          id?: number;
          idInSheet: string;
          isHeld: string;
          packagePurchasedId?: number | null;
          rateMultiplierInSheet?: number | null;
        };
        Update: {
          calculatedCost_helper?: number | null;
          courseId?: number | null;
          created_at?: string;
          date?: string;
          id?: number;
          idInSheet?: string;
          isHeld?: string;
          packagePurchasedId?: number | null;
          rateMultiplierInSheet?: number | null;
        };
      };
      student: {
        Row: {
          created_at: string | null;
          dateJoined: string;
          id: string;
          idInSheet: string;
          payerId: string | null;
          studentEmail_dep: string | null;
          studentName_dep: string | null;
          studentPayerEmail_dep: string | null;
          studentPayerName_dep: string | null;
          yearOfBirth: number | null;
        };
        Insert: {
          created_at?: string | null;
          dateJoined: string;
          id: string;
          idInSheet: string;
          payerId?: string | null;
          studentEmail_dep?: string | null;
          studentName_dep?: string | null;
          studentPayerEmail_dep?: string | null;
          studentPayerName_dep?: string | null;
          yearOfBirth?: number | null;
        };
        Update: {
          created_at?: string | null;
          dateJoined?: string;
          id?: string;
          idInSheet?: string;
          payerId?: string | null;
          studentEmail_dep?: string | null;
          studentName_dep?: string | null;
          studentPayerEmail_dep?: string | null;
          studentPayerName_dep?: string | null;
          yearOfBirth?: number | null;
        };
      };
      teacher: {
        Row: {
          commissionPercentage: number | null;
          created_at: string | null;
          currencyPrefered: string | null;
          dateJoined: string | null;
          englishFluency: string | null;
          id: string;
          idInSheet: string;
          isActive: boolean;
          paymentDetails: string | null;
          paymentMethod: string | null;
          profileLink: string | null;
          teacherEmail_dep: string | null;
          teacherName_dep: string | null;
        };
        Insert: {
          commissionPercentage?: number | null;
          created_at?: string | null;
          currencyPrefered?: string | null;
          dateJoined?: string | null;
          englishFluency?: string | null;
          id: string;
          idInSheet: string;
          isActive: boolean;
          paymentDetails?: string | null;
          paymentMethod?: string | null;
          profileLink?: string | null;
          teacherEmail_dep?: string | null;
          teacherName_dep?: string | null;
        };
        Update: {
          commissionPercentage?: number | null;
          created_at?: string | null;
          currencyPrefered?: string | null;
          dateJoined?: string | null;
          englishFluency?: string | null;
          id?: string;
          idInSheet?: string;
          isActive?: boolean;
          paymentDetails?: string | null;
          paymentMethod?: string | null;
          profileLink?: string | null;
          teacherEmail_dep?: string | null;
          teacherName_dep?: string | null;
        };
      };
      topic: {
        Row: {
          category: string;
          created_at: string;
          id: number;
          idInSheet: string;
          name: string;
          nameFa: string;
        };
        Insert: {
          category: string;
          created_at?: string;
          id?: number;
          idInSheet: string;
          name: string;
          nameFa: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          id?: number;
          idInSheet?: string;
          name?: string;
          nameFa?: string;
        };
      };
      user: {
        Row: {
          authUserId: string;
          countryCode: string | null;
          created_at: string;
          email: string;
          firstname: string;
          firstnameFa: string;
          id: string;
          isAuditRequiredForNames: boolean | null;
          lastname: string;
          lastnameFa: string;
          name: string | null;
          name_dep: string | null;
          nameFa: string | null;
          nameFa_dep: string | null;
          phone: string | null;
          phoneCountryCode: string | null;
        };
        Insert: {
          authUserId: string;
          countryCode?: string | null;
          created_at?: string;
          email: string;
          firstname: string;
          firstnameFa: string;
          id: string;
          isAuditRequiredForNames?: boolean | null;
          lastname: string;
          lastnameFa: string;
          name?: string | null;
          name_dep?: string | null;
          nameFa?: string | null;
          nameFa_dep?: string | null;
          phone?: string | null;
          phoneCountryCode?: string | null;
        };
        Update: {
          authUserId?: string;
          countryCode?: string | null;
          created_at?: string;
          email?: string;
          firstname?: string;
          firstnameFa?: string;
          id?: string;
          isAuditRequiredForNames?: boolean | null;
          lastname?: string;
          lastnameFa?: string;
          name?: string | null;
          name_dep?: string | null;
          nameFa?: string | null;
          nameFa_dep?: string | null;
          phone?: string | null;
          phoneCountryCode?: string | null;
        };
      };
    };
    Views: {
      course_view: {
        Row: {
          id: number | null;
          payerId: string | null;
        };
        Insert: {
          id?: number | null;
          payerId?: string | null;
        };
        Update: {
          id?: number | null;
          payerId?: string | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
