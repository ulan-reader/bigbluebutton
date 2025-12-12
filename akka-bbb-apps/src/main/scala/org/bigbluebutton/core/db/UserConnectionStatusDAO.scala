package org.bigbluebutton.core.db
import slick.jdbc.PostgresProfile.api._

case class UserConnectionStatusDbModel(
    meetingId:          String,
    userId:             String,
    sessionToken:       String,
    clientSessionUUID:  String,
    connectionAliveAt:  Option[java.sql.Timestamp],
<<<<<<< HEAD
    serverRequestId:    Option[String],
=======
>>>>>>> origin/master-dev
    networkRttInMs:     Option[Double],
    applicationRttInMs: Option[Double],
    traceLog:           Option[String],
    status:             String,

)

class UserConnectionStatusDbTableDef(tag: Tag) extends Table[UserConnectionStatusDbModel](tag, None, "user_connectionStatus") {
  override def * = (
<<<<<<< HEAD
    meetingId, userId, sessionToken, clientSessionUUID, connectionAliveAt, serverRequestId, networkRttInMs, applicationRttInMs, traceLog, status
=======
    meetingId, userId, sessionToken, clientSessionUUID, connectionAliveAt, networkRttInMs, applicationRttInMs, traceLog, status
>>>>>>> origin/master-dev
  ) <> (UserConnectionStatusDbModel.tupled, UserConnectionStatusDbModel.unapply)
  val meetingId = column[String]("meetingId", O.PrimaryKey)
  val userId = column[String]("userId", O.PrimaryKey)
  val sessionToken = column[String]("sessionToken", O.PrimaryKey)
  val clientSessionUUID = column[String]("clientSessionUUID", O.PrimaryKey)
  val connectionAliveAt = column[Option[java.sql.Timestamp]]("connectionAliveAt")
<<<<<<< HEAD
  val serverRequestId = column[Option[String]]("serverRequestId")
=======
>>>>>>> origin/master-dev
  val networkRttInMs = column[Option[Double]]("networkRttInMs")
  val applicationRttInMs = column[Option[Double]]("applicationRttInMs")
  val traceLog = column[Option[String]]("traceLog")
  val status = column[String]("status")
}

object UserConnectionStatusDAO {

  def insert(meetingId: String, userId: String, sessionToken: String, clientSessionUUID: String) = {
    DatabaseConnection.enqueue(
      TableQuery[UserConnectionStatusDbTableDef].insertOrUpdate(
        UserConnectionStatusDbModel(
          meetingId = meetingId,
          userId = userId,
          sessionToken = sessionToken,
          clientSessionUUID = clientSessionUUID,
          connectionAliveAt = None,
<<<<<<< HEAD
          serverRequestId = None,
=======
>>>>>>> origin/master-dev
          networkRttInMs = None,
          applicationRttInMs = None,
          traceLog = None,
          status = "normal"
        )
      )
    )
  }

<<<<<<< HEAD
  def updateUserAlive(
                       meetingId: String,
                       userId: String,
                       sessionToken: String,
                       clientSessionUUID: String,
                       serverRequestId: String,
                       rtt: Double,
                       appRtt: Double,
                       traceLog: String,
                       status: String) = {
=======
  def updateUserAlive(meetingId: String, userId: String, sessionToken: String, clientSessionUUID: String, rtt: Double, appRtt: Double, traceLog: String, status: String) = {
>>>>>>> origin/master-dev
    DatabaseConnection.enqueue(
      TableQuery[UserConnectionStatusDbTableDef]
        .filter(_.meetingId === meetingId)
        .filter(_.userId === userId)
        .filter(_.sessionToken === sessionToken)
        .filter(_.clientSessionUUID === clientSessionUUID)
<<<<<<< HEAD
        .map(t => (t.connectionAliveAt, t.serverRequestId, t.networkRttInMs, t.applicationRttInMs, t.traceLog, t.status))
        .update(
          (
            Some(new java.sql.Timestamp(System.currentTimeMillis())),
            Some(serverRequestId),
=======
        .map(t => (t.connectionAliveAt, t.networkRttInMs, t.applicationRttInMs, t.traceLog, t.status))
        .update(
          (
            Some(new java.sql.Timestamp(System.currentTimeMillis())),
>>>>>>> origin/master-dev
            rtt match {
              case 0                => None
              case someRtt: Double  => Some(someRtt)
            },
            appRtt match {
              case 0                => None
              case someRtt: Double  => Some(someRtt)
            },
            traceLog match {
              case ""             => None
              case log: String => Some(log)
            },
            status,
          )
        )
    )
  }

}
