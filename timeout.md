## by-teacher > session ✅

`date, isHeld, calculatedCost_helper,
       packagePurchased(
        course(
          teacher(id,
            user(id, firstname, lastname)
          ),
          courseStudent(studentId)
        )
      )`

no timeout after removing courseStudent

## by-teacher >  Average Session Cost ✅
    `date, isHeld, calculatedCost_helper,
        packagePurchased(
          course(
            teacher(id,
              user(id, firstname, lastname)
            ),
            courseStudent(studentId)
          )
        )`

no timeout after removing courseStudent

## by-category > session ✅

`   date, isHeld, calculatedCost_helper,
                  packagePurchased(
                    course(
                      topic(*),
                      courseStudent(studentId)
                    )
                  )`

no timeout after removing courseStudent

## by-category > student-with-session ✅

supabase.from("session").select(`          date, isHeld, calculatedCost_helper, 
          packagePurchased( 
            course(
              topic(*),
              courseStudent(studentId)
            )
          )
         `)

no timeout after removing courseStudent

## by-category > retention-rate ✅

`date, isHeld, calculatedCost_helper,
  packagePurchased(
  course(
      topic(*),
      courseStudent(studentId)
     )
  )`

no timeout by removing courseStudent(studentId)

## by-category > success-rate-for-intros  🟡

`requestDate, introductionStatus,
         packagePurchased(id) , 
         topic(category)
       `

no timeout by removing packagePurchased(id)

## overal reports



## payment-to-teachers ✅ no timeout was observed

This had no timeout!!!
`    rateMultiplierInSheet, isHeld, date, id,
    course  (
      id, requestedSessionDurationInMinute, topicId , 
      courseStudent (id),
      teacher ( id , 
        user ( id , firstname , lastname, firstnameFa , lastnameFa),
        expertise ( id , sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
      )
    ),
    packagePurchased ( 
      id , numberOfSessions , 
      expertise ( id,  sessionPriceInCAD , sessionDurationOnWebsiteInMinute, startDate , endDate, topicId, teacherId )
    )
         `


