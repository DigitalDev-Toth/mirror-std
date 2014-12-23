<?php
    /*error_reporting(E_ALL ^ E_NOTICE);
    ini_set('display_errors','On');*/
    include 'connect.php';
    
    function getDicomAttrs($tag, $dicomFile) {
        $command = "dcmdump +P $tag $dicomFile";
        exec($command, $exit);
        return trim(substr($exit[0], 15, 36));
    }
    
    $pk = $_REQUEST['pk'];
    $dbconn = pg_connect("host=$hostname port=$port dbname=$database user=$username password=$password") or die('NO HAY CONEXION: ' . pg_last_error());
    $query = "";
    $server = $_SERVER['HTTP_HOST'];
    $wado = "http://$server/wado.php?requestType=WADO";
    $query = "SELECT series.pk, series.institution, study.study_iuid, series.series_iuid, patient.pat_id, patient.pat_name, patient.pat_sex, series.series_desc, series.body_part "
            . "FROM study "
            . "LEFT JOIN series ON series.study_fk=study.pk "
            . "LEFT JOIN patient ON patient.pk=study.patient_fk "
            . "WHERE study.pk=$pk";
    $result = pg_query($dbconn , $query) or die("SQL Error 1: " . pg_last_error());
    $i = 0;

    while ($row = pg_fetch_array($result, null, PGSQL_ASSOC)) {
        $series_id = $row['pk'];
        $study_uid = $row['study_iuid'];
        $series_uid = $row['series_iuid'];
        $series_name = $row['name'];
        $series_desc = $row['series_desc'];
        $series_body_part = $row['body_part'];
        $series_institution = $row['institution'];
        $patient_rut = $row['pat_id'];
        $patient_name = $row['pat_name'];
        $patient_sex = $row['pat_sex'];
    
        if (!$series_name) {
            $series_name = "serie: $series_id";
        }
    
        $sql = "SELECT pk, sop_iuid FROM instance WHERE series_fk=$series_id AND inst_attrs NOT LIKE '%application/pdf%' ORDER BY LPAD(inst_no,10,'0')";
        //$sql = "SELECT pk, sop_iuid, encode(inst_attrs::bytea, 'base64') FROM instance WHERE series_fk=$series_id ORDER BY LPAD(inst_no,10,'0')";
        $resultSeries = pg_query($dbconn , $sql) or die("SQL Error 1: " . pg_last_error());
        $j = 0;
        $url = "";

        while ($data = pg_fetch_array($resultSeries, null, PGSQL_ASSOC)) {
            if ($j == 0) {
                $sql2 = "SELECT filepath FROM files WHERE instance_fk=".$data['pk']." ORDER BY created_time";
                $resultInstance = pg_query($dbconn , $sql2) or die("SQL Error 1: " . pg_last_error());
                $dicomPath = pg_fetch_array($resultInstance, null, PGSQL_ASSOC);
                $dicomImage = "/var/www/newbiopacs/pacs/dcm4chee/server/default/archive/".$dicomPath['filepath'];
                $pixelSpacing = getDicomAttrs("0028,0030", $dicomImage);
                echo $data['inst_attrs'];
            }
            
            $url = "&studyUID=$study_uid&seriesUID=$series_uid&objectUID=".$data['sop_iuid'];
            
            if ($j == 0) {
                $url2 = $url;
            } else {
                $url2 = "$url2,$url";
            }
        
            $j++;
        }

        $sql = "SELECT pk, sop_iuid FROM instance WHERE series_fk=$series_id AND inst_attrs LIKE '%application/pdf%' ORDER BY LPAD(inst_no,10,'0')";
        $resultReport = pg_query($dbconn , $sql) or die("SQL Error 1: " . pg_last_error());
        while ($data = pg_fetch_array($resultReport, null, PGSQL_ASSOC)) {
            $reportArr[] = "&studyUID=$study_uid&seriesUID=$series_uid&objectUID=".$data['sop_iuid'];
        }
        
        $studies[$i]['series'] = array(
            'name' => $series_name,
            'institution' => $series_institution,
            'patient_name' => $patient_name,
            'patient_rut' => $patient_rut,
            'patient_sex' => $patient_sex,
            'series_desc' => $series_desc,
            'series_body_part' => $series_body_part,
            'url' => ($url2),
            'pixelSpacing' => $pixelSpacing,
            'reports' => implode(',', $reportArr)
        );
        
        $i++;
    }          
    
    echo json_encode($studies);
?>