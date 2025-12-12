package org.bigbluebutton.core.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.{ ProvenShape }

case class UserLivekitDbModel(
    meetingId:         String,
    userId:            String,
    livekitToken:      String,
)

class UserLivekitDbTableDef(tag: Tag) extends Table[UserLivekitDbModel](tag, "user_livekit") {
<<<<<<< HEAD
  val meetingId = column[String]("meetingId", O.PrimaryKey)
  val userId = column[String]("userId", O.PrimaryKey)
=======
  val meetingId = column[String]("meetingId")
  val userId = column[String]("userId")
>>>>>>> origin/master-dev
  val livekitToken = column[String]("livekitToken")

  override def * : ProvenShape[UserLivekitDbModel] = (
    meetingId,
    userId,
    livekitToken
  ) <> (UserLivekitDbModel.tupled, UserLivekitDbModel.unapply)
}

object UserLivekitDAO {
  def insert(meetingId: String, userId: String, livekitToken: String) = {
    DatabaseConnection.enqueue(
<<<<<<< HEAD
      TableQuery[UserLivekitDbTableDef].insertOrUpdate(
=======
      TableQuery[UserLivekitDbTableDef].forceInsert(
>>>>>>> origin/master-dev
        UserLivekitDbModel(
          meetingId = meetingId,
          userId = userId,
          livekitToken = livekitToken
        )
      )
    )
  }
}
