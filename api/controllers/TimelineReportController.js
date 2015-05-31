/**
 * TimelineReportController
 *
 * @description :: Server-side logic for managing timelinereports
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	clickReport: function(req, res) {
        if(typeof req.session.user == 'undefined'){
            res.send(500,{err: "您沒有權限" });
        }else{
            var TimelineId = req.param("id");
            var reason = req.param("reason");
            Timelines.findOne(TimelineId).populate('report').exec(function (err, timeline) {
                timeline.report.add({article: TimelineId, reporter: req.session.user.id, reason: reason});
                timeline.save(function (err) { res.send({num:timeline.report.length+1}); });
            });
        }
    },
    cancelReport: function(req, res) {
        if(typeof req.session.user == 'undefined'){
            res.send(500,{err: "您沒有權限" });
        }else{
            var TimelineId = req.param("id");
            var reporter = req.session.user.id;
            Timelines.findOne(TimelineId).populate('report').exec(function (err, timeline) {
                for(i in timeline.report){
                	if(timeline.report[i].article == TimelineId & timeline.report[i].reporter == reporter){
                		delete timeline.report[i];
                		timeline.save(function (err) { res.send({num:timeline.report.length-1}); });
                	}
                }
            });
        }
    }
};

