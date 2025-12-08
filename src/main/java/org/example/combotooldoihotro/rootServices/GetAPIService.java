package org.example.combotooldoihotro.rootServices;


import org.example.combotooldoihotro.rootDTO.IpAddRestDTO;
import org.example.combotooldoihotro.rootEntites.*;

import java.util.List;

public interface GetAPIService {
    List<TableKey> getAllKey();
    List<Ip256ColorGreen> getAllIpSuccess();
    List<IPLogin> getAllIpLogin();
    List<IpDevice> getAllIpDevice();
    void getAddIp();
    IpAddRestDTO getIpAddRest();
}
