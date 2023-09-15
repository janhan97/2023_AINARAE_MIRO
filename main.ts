function 좌회전 () {
    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.YELLOW)
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 속도)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 속도)
    정지카운트 = 0
}
function 정면우측거리측정 () {
    임시정면초음파 = sonar.ping(
    DigitalPin.P0,
    DigitalPin.P1,
    PingUnit.MicroSeconds
    )
    임시오른쪽초음파 = sonar.ping(
    DigitalPin.P12,
    DigitalPin.P13,
    PingUnit.MicroSeconds
    )
    // 1~149사이가 정선된 측정값
    if (100 < 임시정면초음파 && 임시정면초음파 < 28000) {
        정면초음파 = 임시정면초음파
    }
    if (100 < 임시오른쪽초음파 && 임시오른쪽초음파 < 28000) {
        오른쪽초음파 = 임시오른쪽초음파
    } else {
        오른쪽초음파 = 10
        작동 = 1
    }
    huskylens.writeOSD(convertToText(정면초음파), 21, 30)
    huskylens.writeOSD(convertToText(오른쪽초음파), 265, 30)
}
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    작동 = 4
})
function 태그인식 () {
	
}
function 사람인식 () {
    if (huskylens.readArrow_s(Content4.ID) == 1 || huskylens.readArrow_s(Content4.ID) == 2) {
        radio.sendString("fire1")
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        basic.pause(2000)
        현재인식상황 = 1
    }
}
function 이미지인식 () {
    if (현재인식상황 == 0) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        huskylens.request()
        불인식()
    } else if (현재인식상황 == 1) {
        huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
        huskylens.request()
        사람인식()
    } else {
    	
    }
}
function 우회전 () {
    // 왼쪽 모터를 더 빠르게 돌려 오른쪽으로
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 속도 + 5)
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 13)
    정지카운트 = 0
}
function 불인식 () {
    if (huskylens.readArrow_s(Content4.ID) == 1) {
        radio.sendString("fire1")
        DFRobotMaqueenPlus.mototStop(Motors.ALL)
        basic.pause(2000)
        현재인식상황 = 1
    }
}
input.onButtonPressed(Button.A, function () {
    작동 = 0
    if (속도 <= 70) {
        속도 = 속도 + 10
    }
})
function 장애물정지확인 () {
    if (DFRobotMaqueenPlus.readSpeed(Motors1.M2) < 정지감지속도 && DFRobotMaqueenPlus.readSpeed(Motors1.M1) < 정지감지속도) {
        정지카운트 += 1
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.RED)
        if (3 < 정지카운트) {
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 45)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 45)
            basic.pause(정지후진시간 * 2)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 45)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 45)
            basic.pause(정지후진시간 * 2)
            if (속도 <= 60) {
                속도 = 속도 + 5
            }
        } else {
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 55)
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, 55)
            basic.pause(정지후진시간)
        }
    }
}
function 허스키렌즈인식 () {
    huskylens.request()
    인식값 = huskylens.readBox_s(Content3.ID)
    if (인식값 == 1) {
        radio.sendString("fire1")
    }
}
input.onButtonPressed(Button.B, function () {
    if (속도 >= 30) {
        속도 = 속도 - 5
    }
})
let 인식값 = 0
let 오른쪽초음파 = 0
let 정면초음파 = 0
let 임시오른쪽초음파 = 0
let 임시정면초음파 = 0
let 정지후진시간 = 0
let 정지감지속도 = 0
let 속도 = 0
let 작동 = 0
let 정지카운트 = 0
let 현재인식상황 = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_COLOR_RECOGNITION)
radio.setGroup(78)
현재인식상황 = 0
정지카운트 = 0
작동 = 0
속도 = 50
let 우회전감지거리 = 950
let 정면장애물거리 = 750
let 벽과안전거리 = 350
정지감지속도 = 22
정지후진시간 = 450
let 직진오류교정속도 = 24
DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 속도)
basic.pause(100)
while (70 > DFRobotMaqueenPlus.readSpeed(Motors1.M1) || 70 > DFRobotMaqueenPlus.readSpeed(Motors1.M2)) {
    속도 += 2
    DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 속도)
    huskylens.writeOSD(convertToText(DFRobotMaqueenPlus.readSpeed(Motors1.M1)), 31, 191)
    huskylens.writeOSD(convertToText(DFRobotMaqueenPlus.readSpeed(Motors1.M2)), 239, 191)
    basic.pause(100)
}
basic.forever(function () {
    정면우측거리측정()
})
basic.forever(function () {
    if (작동 == 0) {
        이미지인식()
        장애물정지확인()
        if (정면초음파 <= 정면장애물거리) {
            if (오른쪽초음파 >= 우회전감지거리) {
                우회전()
            } else {
                좌회전()
            }
        } else {
            DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBL, Color.BLUE)
            if (오른쪽초음파 >= 우회전감지거리) {
                우회전()
            } else {
                정지카운트 = 0
                // 오른쪽 벽과 멀어지면
                if (0 < 오른쪽초음파 - 벽과안전거리) {
                    // 오른쪽 불 빨간색
                    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.RED)
                    // 왼쪽 모터를 더 빠르게 돌려 오른쪽으로
                    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 속도 + 직진오류교정속도)
                    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 속도 - (직진오류교정속도 + 5))
                } else if (0 > 오른쪽초음파 - 벽과안전거리) {
                    // 오른쪽벽과 가까워지면 파란불
                    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.BLUE)
                    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 속도 + 직진오류교정속도)
                    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 속도 - (직진오류교정속도 + 5))
                } else {
                    DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBR, Color.GREEN)
                    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, 속도)
                    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 속도)
                }
            }
        }
        DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.OFF)
        huskylens.writeOSD(convertToText(DFRobotMaqueenPlus.readSpeed(Motors1.M1)), 15, 191)
        huskylens.writeOSD(convertToText(DFRobotMaqueenPlus.readSpeed(Motors1.M2)), 301, 191)
    }
})
