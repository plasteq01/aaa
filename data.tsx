import React from 'react';
import { TrainingProcess } from './types';

// --- Icon Components ---

export const SafetyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

export const MachineOperationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-sky-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
);

export const QualityControlIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LogisticsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2 2h8a1 1 0 001-1z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 17.5h2.5a2 2 0 002-2V7a2 2 0 00-2-2H12" />
    </svg>
);

export const FireSafetyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75a4.5 4.5 0 004.5-4.5v-1.5a4.5 4.5 0 00-4.5 4.5v1.5z" />
    </svg>
);


// --- Application Data ---

export const trainingData: TrainingProcess[] = [
    {
        id: 'p1',
        title: { vi: "An Toàn Lao Động", th: "ความปลอดภัยในการทำงาน" },
        description: { vi: "Các quy tắc và thực hành an toàn cốt lõi tại nơi làm việc.", th: "กฎและแนวทางปฏิบัติด้านความปลอดภัยที่สำคัญในที่ทำงาน" },
        icon: 'SafetyIcon',
        videos: [
            { id: 'GRSBY2V-cWk', title: { vi: "Video 1: Giới thiệu về An toàn lao động", th: "วิดีโอ 1: ความรู้เบื้องต้นเกี่ยวกับความปลอดภัยในการทำงาน" }, thumbnailUrl: 'https://img.youtube.com/vi/GRSBY2V-cWk/mqdefault.jpg' },
            { id: 'dQw4w9WgXcQ', title: { vi: "Video 2: Sử dụng thiết bị bảo hộ cá nhân (PPE)", th: "วิดีโอ 2: การใช้อุปกรณ์ป้องกันส่วนบุคคล (PPE)" }, thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg' },
            { id: '3JZ_D3WCdjQ', title: { vi: "Video 3: Quy trình xử lý khi có sự cố", th: "วิดีโอ 3: ขั้นตอนการจัดการเหตุการณ์" }, thumbnailUrl: 'https://img.youtube.com/vi/3JZ_D3WCdjQ/mqdefault.jpg' },
        ]
    },
    {
        id: 'p2',
        title: { vi: "Vận Hành Máy Móc", th: "การทำงานของเครื่องจักร" },
        description: { vi: "Hướng dẫn chi tiết vận hành các loại máy móc chính.", th: "คำแนะนำโดยละเอียดสำหรับการทำงานของเครื่องจักรหลัก" },
        icon: 'MachineOperationIcon',
        videos: [
            { id: 'yPYZpwSpKmA', title: { vi: "Vận hành máy CNC - Phần 1", th: "การทำงานของเครื่อง CNC - ส่วนที่ 1" }, thumbnailUrl: 'https://img.youtube.com/vi/yPYZpwSpKmA/mqdefault.jpg' },
            { id: 'EPoG2s2pZis', title: { vi: "Vận hành máy CNC - Phần 2", th: "การทำงานของเครื่อง CNC - ส่วนที่ 2" }, thumbnailUrl: 'https://img.youtube.com/vi/EPoG2s2pZis/mqdefault.jpg' },
            { id: 'b-Aqi1-6L0I', title: { vi: "Bảo trì máy móc định kỳ", th: "การบำรุงรักษาเครื่องจักรตามปกติ" }, thumbnailUrl: 'https://img.youtube.com/vi/b-Aqi1-6L0I/mqdefault.jpg' },
            { id: 'v2aC42y9Jqg', title: { vi: "Xử lý lỗi thường gặp", th: "การแก้ไขปัญหาทั่วไป" }, thumbnailUrl: 'https://img.youtube.com/vi/v2aC42y9Jqg/mqdefault.jpg' },
        ]
    },
    {
        id: 'p3',
        title: { vi: "Kiểm Soát Chất Lượng", th: "การควบคุมคุณภาพ" },
        description: { vi: "Quy trình đảm bảo chất lượng sản phẩm đầu ra.", th: "กระบวนการเพื่อให้แน่ใจว่าคุณภาพของผลิตภัณฑ์ đầu ra" },
        icon: 'QualityControlIcon',
        videos: [
            { id: 'U_ySGSYtQQ4', title: { vi: "Các tiêu chuẩn chất lượng ISO 9001", th: "มาตรฐานคุณภาพ ISO 9001" }, thumbnailUrl: 'https://img.youtube.com/vi/U_ySGSYtQQ4/mqdefault.jpg' },
            { id: 'Vb6kFp5aOPY', title: { vi: "Sử dụng dụng cụ đo lường", th: "การใช้เครื่องมือวัด" }, thumbnailUrl: 'https://img.youtube.com/vi/Vb6kFp5aOPY/mqdefault.jpg' },
            { id: 'sioEY4-D_bA', title: { vi: "Phân loại và xử lý sản phẩm lỗi", th: "การจำแนกและจัดการผลิตภัณฑ์ที่บกพร่อง" }, thumbnailUrl: 'https://img.youtube.com/vi/sioEY4-D_bA/mqdefault.jpg' },
        ]
    },
    {
        id: 'p4',
        title: { vi: "Logistics & Kho Vận", th: "โลจิสติกส์และคลังสินค้า" },
        description: { vi: "Quy trình xuất, nhập và quản lý hàng tồn kho.", th: "กระบวนการส่งออก นำเข้า และจัดการสินค้าคงคลัง" },
        icon: 'LogisticsIcon',
        videos: [
            { id: 'i63a-T_n8GA', title: { vi: "Giới thiệu hệ thống kho vận", th: "ความรู้เบื้องต้นเกี่ยวกับระบบคลังสินค้า" }, thumbnailUrl: 'https://img.youtube.com/vi/i63a-T_n8GA/mqdefault.jpg' },
            { id: 'HliAoes2wQA', title: { vi: "Quy trình nhập kho", th: "กระบวนการนำเข้าคลังสินค้า" }, thumbnailUrl: 'https://img.youtube.com/vi/HliAoes2wQA/mqdefault.jpg' },
            { id: '7zW3a_2d9F4', title: { vi: "Quy trình xuất kho", th: "กระบวนการส่งออกจากคลังสินค้า" }, thumbnailUrl: 'https://img.youtube.com/vi/7zW3a_2d9F4/mqdefault.jpg' },
            { id: 'Vn4M2deO3F4', title: { vi: "Sắp xếp và tối ưu không gian kho", th: "การจัดระเบียบและเพิ่มประสิทธิภาพพื้นที่คลังสินค้า" }, thumbnailUrl: 'https://img.youtube.com/vi/Vn4M2deO3F4/mqdefault.jpg' },
        ]
    },
    {
        id: 'p5',
        title: { vi: "Phòng Cháy Chữa Cháy", th: "การป้องกันอัคคีภัย" },
        description: { vi: "Các kỹ năng cần thiết để phòng và xử lý hỏa hoạn.", th: "ทักษะที่จำเป็นในการป้องกันและจัดการกับอัคคีภัย" },
        icon: 'FireSafetyIcon',
        videos: [
            { id: 'wunV2-124E8', title: { vi: "Nhận biết các loại bình chữa cháy", th: "การรู้จักประเภทของถังดับเพลิง" }, thumbnailUrl: 'https://img.youtube.com/vi/wunV2-124E8/mqdefault.jpg' },
            { id: 'VYOjWnS4cMY', title: { vi: "Thực hành sử dụng bình chữa cháy CO2", th: "การฝึกใช้ถังดับเพลิง CO2" }, thumbnailUrl: 'https://img.youtube.com/vi/VYOjWnS4cMY/mqdefault.jpg' },
            { id: 'Fis0-q28K78', title: { vi: "Kỹ năng thoát hiểm khi có cháy", th: "ทักษะการหลบหนีเมื่อเกิดเพลิงไหม้" }, thumbnailUrl: 'https://img.youtube.com/vi/Fis0-q28K78/mqdefault.jpg' },
        ]
    }
];