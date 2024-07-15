WITH pgrst_source AS (
  SELECT "public"."session"."rateMultiplierInSheet",
    "public"."session"."isHeld",
    "public"."session"."date",
    "public"."session"."id",
    row_to_json("session_course_1".*) AS "course",
    row_to_json("session_packagePurchased_1".*) AS "packagePurchased"
  FROM "public"."session"
    LEFT JOIN LATERAL (
      SELECT "course_1"."id",
        "course_1"."requestedSessionDurationInMinute",
        "course_1"."topicId",
        COALESCE(
          "course_courseStudent_2"."course_courseStudent_2",
          $17
        ) AS "courseStudent",
        row_to_json("course_teacher_2".*) AS "teacher"
      FROM "public"."course" AS "course_1"
        LEFT JOIN LATERAL (
          SELECT json_agg("course_courseStudent_2") AS "course_courseStudent_2"
          FROM (
              SELECT "courseStudent_2"."id"
              FROM "public"."courseStudent" AS "courseStudent_2"
              WHERE "courseStudent_2"."courseId" = "course_1"."id"
              LIMIT $1 OFFSET $2
            ) AS "course_courseStudent_2"
        ) AS "course_courseStudent_2" ON $18
        LEFT JOIN LATERAL (
          SELECT "teacher_2"."id",
            row_to_json("teacher_user_3".*) AS "user",
            COALESCE(
              "teacher_expertise_3"."teacher_expertise_3",
              $19
            ) AS "expertise"
          FROM "public"."teacher" AS "teacher_2"
            LEFT JOIN LATERAL (
              SELECT "user_3"."id",
                "user_3"."firstname",
                "user_3"."lastname",
                "user_3"."firstnameFa",
                "user_3"."lastnameFa"
              FROM "public"."user" AS "user_3"
              WHERE "user_3"."id" = "teacher_2"."id"
              LIMIT $3 OFFSET $4
            ) AS "teacher_user_3" ON $20
            LEFT JOIN LATERAL (
              SELECT json_agg("teacher_expertise_3") AS "teacher_expertise_3"
              FROM (
                  SELECT "expertise_3"."id",
                    "expertise_3"."sessionPriceInCAD",
                    "expertise_3"."sessionDurationOnWebsiteInMinute",
                    "expertise_3"."startDate",
                    "expertise_3"."endDate",
                    "expertise_3"."topicId",
                    "expertise_3"."teacherId"
                  FROM "public"."expertise" AS "expertise_3"
                  WHERE "expertise_3"."teacherId" = "teacher_2"."id"
                  LIMIT $5 OFFSET $6
                ) AS "teacher_expertise_3"
            ) AS "teacher_expertise_3" ON $21
          WHERE "teacher_2"."id" = "course_1"."teacherId"
          LIMIT $7 OFFSET $8
        ) AS "course_teacher_2" ON $22
      WHERE "course_1"."id" = "public"."session"."courseId"
      LIMIT $9 OFFSET $10
    ) AS "session_course_1" ON $23
    LEFT JOIN LATERAL (
      SELECT "packagePurchased_1"."id",
        "packagePurchased_1"."numberOfSessions",
        row_to_json("packagePurchased_expertise_2".*) AS "expertise"
      FROM "public"."packagePurchased" AS "packagePurchased_1"
        LEFT JOIN LATERAL (
          SELECT "expertise_2"."id",
            "expertise_2"."sessionPriceInCAD",
            "expertise_2"."sessionDurationOnWebsiteInMinute",
            "expertise_2"."startDate",
            "expertise_2"."endDate",
            "expertise_2"."topicId",
            "expertise_2"."teacherId"
          FROM "public"."expertise" AS "expertise_2"
          WHERE "expertise_2"."id" = "packagePurchased_1"."expertiseId"
          LIMIT $11 OFFSET $12
        ) AS "packagePurchased_expertise_2" ON $24
      WHERE "packagePurchased_1"."id" = "public"."session"."packagePurchasedId"
      LIMIT $13 OFFSET $14
    ) AS "session_packagePurchased_1" ON $25
  LIMIT $15 OFFSET $16
)
SELECT $26::bigint AS total_result_set,
  pg_catalog.count(_postgrest_t) AS page_total,
  coalesce(json_agg(_postgrest_t), $27)::character varying AS body,
  nullif(current_setting($28, $29), $30) AS response_headers,
  nullif(current_setting($31, $32), $33) AS response_status
FROM (
    SELECT *
    FROM pgrst_source
  ) _postgrest_t