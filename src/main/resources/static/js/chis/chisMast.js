// // ==========================================
// // 1. Cài đặt và Biến (Configs & Variables)
// // (Giữ nguyên)
// // ==========================================
// const MUSIC_URL = "./audio.mp3";
// let bgMusic = new Audio(MUSIC_URL);
// bgMusic.loop = true; bgMusic.volume = 1.0;
//
// const loader = new THREE.TextureLoader();
// // const photoFiles = ['./image1.jpeg', './image2.jpeg', './image3.jpeg', './image4.jpeg', './image5.jpeg'];
// // const photoTextures = [];
// // photoFiles.forEach((f, i) => photoTextures[i] = loader.load(f));
//
// let photoFiles = ['./image1.jpeg', './image2.jpeg', './image3.jpeg', './image4.jpeg', './image5.jpeg'];
// let photoTextures = [];
// // Khai báo là 'let' vì chúng ta sẽ ghi đè chúng
// // Ban đầu vẫn load ảnh mặc định để giao diện không bị lỗi nếu người dùng không chọn
// photoFiles.forEach((f, i) => photoTextures[i] = loader.load(f));
//
// // Hàm này được gọi khi người dùng chọn ảnh mới
// function loadNewPhotos(files) {
//     if (files.length === 0) return;
//
//     // 1. Xóa và Dispose các texture cũ (giải phóng bộ nhớ)
//     photoTextures.forEach(tex => tex.dispose());
//     photoTextures = [];
//     photoFiles = [];
//
//     // 2. Chuyển đổi FileList thành Array và lọc ra chỉ các tệp hình ảnh
//     const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
//
//     // 3. Sử dụng FileReader để đọc tệp từ máy tính người dùng
//     const fileLoader = new THREE.TextureLoader();
//     let loadedCount = 0;
//
//     // Đảm bảo chỉ lấy tối đa 50 ảnh để tránh treo máy
//     imageFiles.slice(0, 50).forEach((file, i) => {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             // Lấy URL dữ liệu và tạo texture từ đó
//             const texture = fileLoader.load(e.target.result);
//             photoTextures[i] = texture;
//             loadedCount++;
//
//             if (loadedCount === Math.min(imageFiles.length, 50)) {
//                 // Sau khi load xong tất cả ảnh mới, phải khởi tạo lại photoMeshes
//                 // vì số lượng ảnh có thể thay đổi
//                 if (photoMeshes.length > 0) {
//                     photoMeshes.forEach(m => scene.remove(m));
//                     photoMeshes = [];
//                 }
//
//                 // Tạo lại các mesh mới với số lượng texture mới
//                 createPhotos();
//
//                 // <<< THÊM LOGIC ẨN NÚT SAU KHI TẢI XONG
//                 document.getElementById('btnSelectPhotos').style.display = 'none';
//                 // Có thể chuyển về trạng thái cây hoặc bung quà sau khi load
//                 state = 'EXPLODE';
//                 targetZ = 75;
//             }
//         };
//         reader.readAsDataURL(file);
//     });
//
//     // Nếu không có ảnh nào được chọn (chỉ chọn folder rỗng)
//     if (imageFiles.length === 0) {
//         alert("Không tìm thấy tệp ảnh nào trong thư mục đã chọn.");
//         // Quay lại trạng thái mặc định nếu cần
//     }
// }
//
//
// // --- Tạo Textures Tùy chỉnh (Giữ nguyên) ---
// function createCustomTexture(type) {
//     const canvas = document.createElement('canvas');
//     canvas.width = 128; canvas.height = 128;
//     const ctx = canvas.getContext('2d');
//     const cx = 64, cy = 64;
//
//     if (type === 'gold_glow') {
//         const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
//         grd.addColorStop(0, '#FFFFFF');
//         grd.addColorStop(0.2, '#FFFFE0');
//         grd.addColorStop(0.5, '#FFD700');
//         grd.addColorStop(1, 'rgba(0,0,0,0)');
//         ctx.fillStyle = grd; ctx.fillRect(0,0,128,128);
//     } else if (type === 'red_light') {
//         const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
//         grd.addColorStop(0, '#FFAAAA');
//         grd.addColorStop(0.3, '#FF0000');
//         grd.addColorStop(1, 'rgba(0,0,0,0)');
//         ctx.fillStyle = grd; ctx.fillRect(0,0,128,128);
//     } else if (type === 'gift_red') {
//         ctx.fillStyle = '#D32F2F';
//         ctx.fillRect(20, 20, 88, 88);
//         ctx.fillStyle = '#FFD700';
//         ctx.fillRect(54, 20, 20, 88);
//         ctx.fillRect(20, 54, 88, 20);
//         ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth=2; ctx.strokeRect(20,20,88,88);
//     }
//     return new THREE.CanvasTexture(canvas);
// }
//
// const textures = {
//     gold: createCustomTexture('gold_glow'),
//     red: createCustomTexture('red_light'),
//     gift: createCustomTexture('gift_red')
// };
//
// // ==========================================
// // 2. Cài đặt 3D (THREE.js Setup)
// // (Giữ nguyên)
// // ==========================================
// const CONFIG = {
//     goldCount: 2000,
//     redCount: 300,
//     giftCount: 150,
//     explodeRadius: 65,
//     photoOrbitRadius: 40,
//     treeHeight: 70,
//     treeBaseRadius: 35
// };
//
// let scene, camera, renderer;
// let groupGold, groupRed, groupGift;
// let photoMeshes = [];
// let titleMesh, starMesh;
//
// let state = 'TREE';
// let selectedIndex = 0;
//
// // Biến điều khiển Chuột & Kéo
// let targetZ = 100;
// let isDragging = false;
// let lastMouseX = 0;
// let rotationSpeed = 0;
// let hasDragged = false; // <<< BIẾN CỜ MỚI ĐỂ XÁC ĐỊNH THAO TÁC KÉO
//
// function init3D() {
//     document.getElementById('camera-preview').style.display = 'none';
//     document.getElementsByClassName('input_video')[0].style.display = 'none';
//
//     const container = document.getElementById('canvas-container');
//     scene = new THREE.Scene();
//     scene.fog = new THREE.FogExp2(0x000000, 0.002);
//
//     camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
//     camera.position.z = targetZ;
//
//     renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);
//
//     groupGold = createParticleSystem('gold', CONFIG.goldCount, 2.0);
//     groupRed = createParticleSystem('red', CONFIG.redCount, 3.5);
//     groupGift = createParticleSystem('gift', CONFIG.giftCount, 3.0);
//
//     createPhotos();
//     createDecorations();
//     animate();
// }
//
// function createParticleSystem(type, count, size) {
//     const pPositions = [];
//     const pExplodeTargets = [];
//     const pTreeTargets = [];
//
//     for(let i=0; i<count; i++) {
//         const h = Math.random() * CONFIG.treeHeight;
//         const y = h - CONFIG.treeHeight / 2;
//         let radiusRatio = (type === 'gold') ? Math.sqrt(Math.random()) : 0.9 + Math.random()*0.1;
//         const maxR = (1 - (h / CONFIG.treeHeight)) * CONFIG.treeBaseRadius;
//         const r = maxR * radiusRatio;
//         const theta = Math.random() * Math.PI * 2;
//         const tx = r * Math.cos(theta);
//         const tz = r * Math.sin(theta);
//         pTreeTargets.push(tx, y, tz);
//
//         const u = Math.random();
//         const v = Math.random();
//         const phi = Math.acos(2 * v - 1);
//         const lam = 2 * Math.PI * u;
//         let radMult = (type === 'gift') ? 1.2 : 1.0;
//         const rad = CONFIG.explodeRadius * Math.cbrt(Math.random()) * radMult;
//
//         const ex = rad * Math.sin(phi) * Math.cos(lam);
//         const ey = rad * Math.sin(phi) * Math.sin(lam);
//         const ez = rad * Math.cos(phi);
//         pExplodeTargets.push(ex, ey, ez);
//
//         pPositions.push(tx, y, tz);
//     }
//
//     const geo = new THREE.BufferGeometry();
//     geo.setAttribute('position', new THREE.Float32BufferAttribute(pPositions, 3));
//     geo.userData = { tree: pTreeTargets, explode: pExplodeTargets };
//
//     const mat = new THREE.PointsMaterial({
//         size: size,
//         map: textures[type],
//         transparent: true, opacity: 1.0,
//         blending: (type === 'gift') ? THREE.NormalBlending : THREE.AdditiveBlending,
//         depthWrite: false,
//         sizeAttenuation: true
//     });
//
//     const points = new THREE.Points(geo, mat);
//     scene.add(points);
//     return points;
// }
//
// function createPhotos() {
//     const geo = new THREE.PlaneGeometry(8, 8);
//     const borderGeo = new THREE.PlaneGeometry(9, 9);
//     const borderMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });
//
//     // for(let i=0; i<5; i++) {
//     for(let i=0; i<photoTextures.length; i++) { // Lặp theo số lượng ảnh thực tế
//         const mat = new THREE.MeshBasicMaterial({
//             map: photoTextures[i], side: THREE.DoubleSide
//         });
//         const mesh = new THREE.Mesh(geo, mat);
//         const border = new THREE.Mesh(borderGeo, borderMat);
//         border.position.z = -0.1;
//         mesh.add(border);
//
//         mesh.visible = false;
//         mesh.scale.set(0,0,0);
//         scene.add(mesh);
//         photoMeshes.push(mesh);
//     }
// }
//
// function createDecorations() {
//     const canvas = document.createElement('canvas');
//     canvas.width = 1024; canvas.height = 256;
//     const ctx = canvas.getContext('2d');
//     ctx.font = 'bold italic 90px "Times New Roman"';
//     ctx.fillStyle = '#FFD700'; ctx.textAlign = 'center';
//     ctx.shadowColor = "#FF0000"; ctx.shadowBlur = 40;
//     ctx.fillText("MERRY CHRISTMAS", 512, 130);
//
//     const tex = new THREE.CanvasTexture(canvas);
//     const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending });
//     titleMesh = new THREE.Mesh(new THREE.PlaneGeometry(60, 15), mat);
//     titleMesh.position.set(0, 50, 0);
//     scene.add(titleMesh);
//
//     const starCanvas = document.createElement('canvas');
//     starCanvas.width = 128; starCanvas.height = 128;
//     const sCtx = starCanvas.getContext('2d');
//     sCtx.fillStyle = "#FFFF00"; sCtx.shadowColor="#FFF"; sCtx.shadowBlur=20;
//     sCtx.beginPath();
//     const cx=64, cy=64, outer=50, inner=20;
//     for(let i=0; i<5; i++){
//         sCtx.lineTo(cx + Math.cos((18+i*72)/180*Math.PI)*outer, cy - Math.sin((18+i*72)/180*Math.PI)*outer);
//         sCtx.lineTo(cx + Math.cos((54+i*72)/180*Math.PI)*inner, cy - Math.sin((54+i*72)/180*Math.PI)*inner);
//     }
//     sCtx.closePath(); sCtx.fill();
//     const starTex = new THREE.CanvasTexture(starCanvas);
//     const starMat = new THREE.MeshBasicMaterial({ map: starTex, transparent: true, blending: THREE.AdditiveBlending });
//     starMesh = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), starMat);
//     starMesh.position.set(0, CONFIG.treeHeight/2 + 2, 0);
//     scene.add(starMesh);
// }
//
// function updateParticleGroup(group, targetState, speed, mouseRotY, time, isBlinking) {
//     const positions = group.geometry.attributes.position.array;
//     const targetKey = (targetState === 'TREE') ? 'tree' : 'explode';
//     const targets = group.geometry.userData[(targetState === 'PHOTO') ? 'explode' : targetKey];
//
//     for(let i=0; i<positions.length; i++) {
//         positions[i] += (targets[i] - positions[i]) * speed;
//     }
//     group.geometry.attributes.position.needsUpdate = true;
//
//     if (targetState === 'TREE') {
//         group.rotation.y += 0.003;
//         if(isBlinking) {
//             const scale = 1 + Math.sin(time * 5) * 0.2;
//             group.scale.set(scale, scale, scale);
//         } else {
//             group.scale.set(1,1,1);
//         }
//     } else {
//         group.scale.set(1,1,1);
//
//         // --- ĐIỀU CHỈNH TẠI ĐÂY ---
//         // 1. Giữ lại tốc độ quay tự động ổn định (0.005)
//         group.rotation.y += 0.003;
//
//         // 2. BỎ QUA rotationSpeed (tốc độ kéo chuột) để đảm bảo quay không ngừng
//         // group.rotation.y += rotationSpeed * 0.05; // Đã loại bỏ
//         // rotationSpeed *= 0.95; // Đã loại bỏ
//     }
// }
//
// // ==========================================
// // 3. Vòng Lặp Hoạt Hình (Animation Loop)
// // ==========================================
// function animate() {
//     requestAnimationFrame(animate);
//     const time = Date.now() * 0.001;
//     const speed = 0.06;
//     const mouseRotY = 0;
//
//     camera.position.z += (targetZ - camera.position.z) * 0.05;
//
//     updateParticleGroup(groupGold, state, speed, mouseRotY, time, false);
//     updateParticleGroup(groupRed, state, speed, mouseRotY, time, true);
//     updateParticleGroup(groupGift, state, speed, mouseRotY, time, false);
//
//     if (state === 'TREE') {
//         document.getElementById('status').innerText = "Lăn Chuột Xuống (Thu Cây)";
//         document.getElementById('status').style.color = "#FFD700";
//         titleMesh.visible = true; starMesh.visible = true;
//         titleMesh.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
//         starMesh.rotation.z -= 0.02;
//         photoMeshes.forEach(m => { m.scale.lerp(new THREE.Vector3(0,0,0), 0.1); m.visible = false; });
//
//     } else if (state === 'EXPLODE') {
//         document.getElementById('status').innerText = "Lăn Chuột Lên & Kéo (Bung Quà & Quay)";
//         document.getElementById('status').style.color = "#FFA500";
//         titleMesh.visible = false; starMesh.visible = false;
//
//         const baseAngle = groupGold.rotation.y;
//         const angleStep = (Math.PI * 2) / photoTextures.length;
//         let bestIdx = 0; let maxZ = -999;
//
//         photoMeshes.forEach((mesh, i) => {
//             mesh.visible = true;
//             const angle = baseAngle + i * angleStep;
//             const x = Math.sin(angle) * CONFIG.photoOrbitRadius;
//             const z = Math.cos(angle) * CONFIG.photoOrbitRadius;
//             const y = Math.sin(time + i) * 3;
//
//             mesh.position.lerp(new THREE.Vector3(x, y, z), 0.1);
//             mesh.lookAt(camera.position);
//
//             if (z > maxZ) { maxZ = z; bestIdx = i; }
//
//             if (z > 5) {
//                 const distScale = 1.0 + (z / CONFIG.photoOrbitRadius) * 0.8;
//                 mesh.scale.lerp(new THREE.Vector3(distScale, distScale, distScale), 0.1);
//             } else {
//                 mesh.scale.lerp(new THREE.Vector3(0.6, 0.6, 0.6), 0.1);
//             }
//         });
//         selectedIndex = bestIdx;
//
//     } else if (state === 'PHOTO') {
//         document.getElementById('status').innerText = "Click Chuột (Xem Ảnh) - Kéo để xoay";
//         document.getElementById('status').style.color = "#00FFFF";
//
//         groupGold.rotation.y += rotationSpeed * 0.02;
//         groupRed.rotation.y += rotationSpeed * 0.02;
//         groupGift.rotation.y += rotationSpeed * 0.02;
//
//         photoMeshes.forEach((mesh, i) => {
//             if (i === selectedIndex) {
//                 mesh.position.lerp(new THREE.Vector3(0, 0, 45), 0.1);
//                 mesh.scale.lerp(new THREE.Vector3(5, 5, 5), 0.1);
//
//                 mesh.lookAt(camera.position);
//                 mesh.rotation.z = 0;
//             } else {
//                 mesh.scale.lerp(new THREE.Vector3(0,0,0), 0.1);
//             }
//         });
//     }
//
//     renderer.render(scene, camera);
// }
//
// // ==========================================
// // 4. Logic Điều Khiển Chuột (Drag/Scroll Logic)
// // ==========================================
//
// function onMouseWheel(event) {
//     event.preventDefault();
//
//     if (event.deltaY > 0) {
//         state = 'TREE';
//         targetZ = 100;
//     } else if (event.deltaY < 0) {
//         state = 'EXPLODE';
//         targetZ = 75;
//     }
// }
//
// function onMouseDown(event) {
//     if (event.button === 0 && (state === 'EXPLODE' || state === 'PHOTO')) {
//         isDragging = true;
//         hasDragged = false; // Reset cờ kéo khi bắt đầu bấm chuột
//         lastMouseX = event.clientX;
//     }
// }
//
// function onMouseUp(event) {
//     isDragging = false;
//     // Không cần reset hasDragged ở đây. Chúng ta sẽ reset nó trong onMouseClick
//     // để nó có thể được kiểm tra.
// }
//
// function onMouseMove(event) {
//     if (isDragging) {
//         const deltaX = event.clientX - lastMouseX;
//
//         // Dùng một ngưỡng kéo nhỏ (ví dụ 3 pixel) để xác định đã Kéo hay chưa
//         if (Math.abs(deltaX) > 3) {
//             hasDragged = true; // <<< Đánh dấu đã kéo
//         }
//
//         rotationSpeed = deltaX / 500;
//
//         groupGold.rotation.y += rotationSpeed;
//         groupRed.rotation.y += rotationSpeed;
//         groupGift.rotation.y += rotationSpeed;
//
//         lastMouseX = event.clientX;
//     }
// }
//
// function onMouseClick(event) {
//     // Nếu hasDragged là true, có nghĩa là người dùng đã kéo, không phải click.
//     if (hasDragged) {
//         hasDragged = false; // Reset cờ kéo sau khi click đã được xử lý (hoặc bỏ qua)
//         return; // Dừng hàm, không chuyển trạng thái PHOTO
//     }
//
//     // --- Logic Click CHỈ CHẠY KHI KHÔNG KÉO ---
//     if (state === 'EXPLODE') {
//         state = 'PHOTO';
//         targetZ = 89; // Giữ nguyên vị trí Z
//     } else if (state === 'PHOTO') {
//         state = 'EXPLODE';
//     }
//     // ----------------------------------------
//
//     // Nếu nó là một click thực sự, chúng ta không cần reset hasDragged vì nó đã là false
// }
//
//
// // function startSystem() {
// //     document.getElementById('btnStart').style.display = 'none';
// //     bgMusic.play().catch(e => console.log(e));
// //     init3D();
//
// //     window.addEventListener('wheel', onMouseWheel, { passive: false });
// //     window.addEventListener('mousedown', onMouseDown, false);
// //     window.addEventListener('mouseup', onMouseUp, false);
// //     window.addEventListener('mousemove', onMouseMove, false);
// //     window.addEventListener('click', onMouseClick, false);
// // }
//
// function startSystem() {
//     document.getElementById('btnStart').style.display = 'none';
//     // <<< HIỂN THỊ NÚT CHỌN ẢNH KHI BẮT ĐẦU
//     document.getElementById('btnSelectPhotos').style.display = 'inline-block';
//
//     bgMusic.play().catch(e => console.log(e));
//     init3D();
//
//     // ... [GIỮ NGUYÊN LOGIC CHUỘT] ...
//     window.addEventListener('wheel', onMouseWheel, { passive: false });
//     window.addEventListener('mousedown', onMouseDown, false);
//     window.addEventListener('mouseup', onMouseUp, false);
//     window.addEventListener('mousemove', onMouseMove, false);
//     window.addEventListener('click', onMouseClick, false);
//     // ...
//
//     // --- LOGIC XỬ LÝ CHỌN TỆP ---
//     const fileInput = document.getElementById('fileInput');
//     const selectButton = document.getElementById('btnSelectPhotos');
//
//     selectButton.addEventListener('click', () => {
//         // Kích hoạt input ẩn khi người dùng nhấn nút
//         fileInput.click();
//     });
//
//     fileInput.addEventListener('change', (event) => {
//         // event.target.files chứa danh sách các tệp/thư mục được chọn
//         loadNewPhotos(event.target.files);
//     });
// }
//
// // ==========================================
// // 5. Sự kiện Window (Window Events)
// // (Giữ nguyên)
// // ==========================================
// window.addEventListener('resize', () => {
//     if(camera) {
//         camera.aspect = window.innerWidth/window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
// });
// function logError(e) { document.getElementById('error-log').style.display='block'; document.getElementById('error-log').innerText+=e+"\n"; }
//
// // startSystem()

// ==========================================
// 1. Cài đặt và Biến (Configs & Variables)
// (Giữ nguyên)
// ==========================================
const MUSIC_URL = "./audio.mp3";
let bgMusic = new Audio(MUSIC_URL);
bgMusic.loop = true; bgMusic.volume = 1.0;

const loader = new THREE.TextureLoader();
// const photoFiles = ['./image1.jpeg', './image2.jpeg', './image3.jpeg', './image4.jpeg', './image5.jpeg'];
// const photoTextures = [];
// photoFiles.forEach((f, i) => photoTextures[i] = loader.load(f));

let photoFiles = ['./image1.jpeg', './image2.jpeg', './image3.jpeg', './image4.jpeg', './image5.jpeg'];
let photoTextures = [];
// Khai báo là 'let' vì chúng ta sẽ ghi đè chúng
// Ban đầu vẫn load ảnh mặc định để giao diện không bị lỗi nếu người dùng không chọn
photoFiles.forEach((f, i) => photoTextures[i] = loader.load(f));

// Hàm này được gọi khi người dùng chọn ảnh mới
function loadNewPhotos(files) {
    if (files.length === 0) return;

    // 1. Xóa và Dispose các texture cũ (giải phóng bộ nhớ)
    photoTextures.forEach(tex => tex.dispose());
    photoTextures = [];
    photoFiles = [];

    // 2. Chuyển đổi FileList thành Array và lọc ra chỉ các tệp hình ảnh
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

    // 3. Sử dụng FileReader để đọc tệp từ máy tính người dùng
    const fileLoader = new THREE.TextureLoader();
    let loadedCount = 0;

    // Đảm bảo chỉ lấy tối đa 50 ảnh để tránh treo máy
    imageFiles.slice(0, 50).forEach((file, i) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Lấy URL dữ liệu và tạo texture từ đó
            const texture = fileLoader.load(e.target.result);
            photoTextures[i] = texture;
            loadedCount++;

            if (loadedCount === Math.min(imageFiles.length, 50)) {
                // Sau khi load xong tất cả ảnh mới, phải khởi tạo lại photoMeshes
                // vì số lượng ảnh có thể thay đổi
                if (photoMeshes.length > 0) {
                    photoMeshes.forEach(m => scene.remove(m));
                    photoMeshes = [];
                }

                // Tạo lại các mesh mới với số lượng texture mới
                createPhotos();

                // <<< THÊM LOGIC ẨN NÚT SAU KHI TẢI XONG
                document.getElementById('btnSelectPhotos').style.display = 'none';
                // Có thể chuyển về trạng thái cây hoặc bung quà sau khi load
                state = 'EXPLODE';
                targetZ = 75;
            }
        };
        reader.readAsDataURL(file);
    });

    // Nếu không có ảnh nào được chọn (chỉ chọn folder rỗng)
    if (imageFiles.length === 0) {
        alert("Không tìm thấy tệp ảnh nào trong thư mục đã chọn.");
        // Quay lại trạng thái mặc định nếu cần
    }
}


// --- Tạo Textures Tùy chỉnh (Giữ nguyên) ---
function createCustomTexture(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const cx = 64, cy = 64;

    if (type === 'gold_glow') {
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40);
        grd.addColorStop(0, '#FFFFFF');
        grd.addColorStop(0.2, '#FFFFE0');
        grd.addColorStop(0.5, '#FFD700');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd; ctx.fillRect(0,0,128,128);
    } else if (type === 'red_light') {
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
        grd.addColorStop(0, '#FFAAAA');
        grd.addColorStop(0.3, '#FF0000');
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd; ctx.fillRect(0,0,128,128);
    } else if (type === 'gift_red') {
        ctx.fillStyle = '#D32F2F';
        ctx.fillRect(20, 20, 88, 88);
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(54, 20, 20, 88);
        ctx.fillRect(20, 54, 88, 20);
        ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth=2; ctx.strokeRect(20,20,88,88);
    }
    return new THREE.CanvasTexture(canvas);
}

const textures = {
    gold: createCustomTexture('gold_glow'),
    red: createCustomTexture('red_light'),
    gift: createCustomTexture('gift_red')
};

// ==========================================
// 2. Cài đặt 3D (THREE.js Setup)
// (Giữ nguyên)
// ==========================================
const CONFIG = {
    goldCount: 2000,
    redCount: 300,
    giftCount: 150,
    explodeRadius: 65,
    photoOrbitRadius: 40,
    treeHeight: 70,
    treeBaseRadius: 35
};

let scene, camera, renderer;
let groupGold, groupRed, groupGift;
let photoMeshes = [];
let titleMesh, starMesh;

let state = 'TREE';
let selectedIndex = 0;

// Biến điều khiển Chuột & Kéo
let targetZ = 100;
let isDragging = false;
let lastMouseX = 0;
let rotationSpeed = 0;
let hasDragged = false; // <<< BIẾN CỜ MỚI ĐỂ XÁC ĐỊNH THAO TÁC KÉO

function init3D() {
    document.getElementById('camera-preview').style.display = 'none';
    document.getElementsByClassName('input_video')[0].style.display = 'none';

    const container = document.getElementById('canvas-container');
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = targetZ;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    groupGold = createParticleSystem('gold', CONFIG.goldCount, 2.0);
    groupRed = createParticleSystem('red', CONFIG.redCount, 3.5);
    groupGift = createParticleSystem('gift', CONFIG.giftCount, 3.0);

    createPhotos();
    createDecorations();
    animate();
}

function createParticleSystem(type, count, size) {
    const pPositions = [];
    const pExplodeTargets = [];
    const pTreeTargets = [];

    for(let i=0; i<count; i++) {
        const h = Math.random() * CONFIG.treeHeight;
        const y = h - CONFIG.treeHeight / 2;
        let radiusRatio = (type === 'gold') ? Math.sqrt(Math.random()) : 0.9 + Math.random()*0.1;
        const maxR = (1 - (h / CONFIG.treeHeight)) * CONFIG.treeBaseRadius;
        const r = maxR * radiusRatio;
        const theta = Math.random() * Math.PI * 2;
        const tx = r * Math.cos(theta);
        const tz = r * Math.sin(theta);
        pTreeTargets.push(tx, y, tz);

        const u = Math.random();
        const v = Math.random();
        const phi = Math.acos(2 * v - 1);
        const lam = 2 * Math.PI * u;
        let radMult = (type === 'gift') ? 1.2 : 1.0;
        const rad = CONFIG.explodeRadius * Math.cbrt(Math.random()) * radMult;

        const ex = rad * Math.sin(phi) * Math.cos(lam);
        const ey = rad * Math.sin(phi) * Math.sin(lam);
        const ez = rad * Math.cos(phi);
        pExplodeTargets.push(ex, ey, ez);

        pPositions.push(tx, y, tz);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pPositions, 3));
    geo.userData = { tree: pTreeTargets, explode: pExplodeTargets };

    const mat = new THREE.PointsMaterial({
        size: size,
        map: textures[type],
        transparent: true, opacity: 1.0,
        blending: (type === 'gift') ? THREE.NormalBlending : THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    return points;
}

function createPhotos() {
    const geo = new THREE.PlaneGeometry(8, 8);
    const borderGeo = new THREE.PlaneGeometry(9, 9);
    const borderMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 });

    // for(let i=0; i<5; i++) {
    for(let i=0; i<photoTextures.length; i++) { // Lặp theo số lượng ảnh thực tế
        const mat = new THREE.MeshBasicMaterial({
            map: photoTextures[i], side: THREE.DoubleSide
        });
        const mesh = new THREE.Mesh(geo, mat);
        const border = new THREE.Mesh(borderGeo, borderMat);
        border.position.z = -0.1;
        mesh.add(border);

        mesh.visible = false;
        mesh.scale.set(0,0,0);
        scene.add(mesh);
        photoMeshes.push(mesh);
    }
}

function createDecorations() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.font = 'bold italic 90px "Times New Roman"';
    ctx.fillStyle = '#FFD700'; ctx.textAlign = 'center';
    ctx.shadowColor = "#FF0000"; ctx.shadowBlur = 40;
    ctx.fillText("MERRY CHRISTMAS", 512, 130);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending });
    titleMesh = new THREE.Mesh(new THREE.PlaneGeometry(60, 15), mat);
    titleMesh.position.set(0, 50, 0);
    scene.add(titleMesh);

    const starCanvas = document.createElement('canvas');
    starCanvas.width = 128; starCanvas.height = 128;
    const sCtx = starCanvas.getContext('2d');
    sCtx.fillStyle = "#FFFF00"; sCtx.shadowColor="#FFF"; sCtx.shadowBlur=20;
    sCtx.beginPath();
    const cx=64, cy=64, outer=50, inner=20;
    for(let i=0; i<5; i++){
        sCtx.lineTo(cx + Math.cos((18+i*72)/180*Math.PI)*outer, cy - Math.sin((18+i*72)/180*Math.PI)*outer);
        sCtx.lineTo(cx + Math.cos((54+i*72)/180*Math.PI)*inner, cy - Math.sin((54+i*72)/180*Math.PI)*inner);
    }
    sCtx.closePath(); sCtx.fill();
    const starTex = new THREE.CanvasTexture(starCanvas);
    const starMat = new THREE.MeshBasicMaterial({ map: starTex, transparent: true, blending: THREE.AdditiveBlending });
    starMesh = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), starMat);
    starMesh.position.set(0, CONFIG.treeHeight/2 + 2, 0);
    scene.add(starMesh);
}

function updateParticleGroup(group, targetState, speed, mouseRotY, time, isBlinking) {
    const positions = group.geometry.attributes.position.array;
    const targetKey = (targetState === 'TREE') ? 'tree' : 'explode';
    const targets = group.geometry.userData[(targetState === 'PHOTO') ? 'explode' : targetKey];

    for(let i=0; i<positions.length; i++) {
        positions[i] += (targets[i] - positions[i]) * speed;
    }
    group.geometry.attributes.position.needsUpdate = true;

    if (targetState === 'TREE') {
        group.rotation.y += 0.003;
        if(isBlinking) {
            const scale = 1 + Math.sin(time * 5) * 0.2;
            group.scale.set(scale, scale, scale);
        } else {
            group.scale.set(1,1,1);
        }
    } else {
        group.scale.set(1,1,1);

        // --- ĐIỀU CHỈNH TẠI ĐÂY ---
        // 1. Giữ lại tốc độ quay tự động ổn định (0.005)
        group.rotation.y += 0.003;

        // 2. BỎ QUA rotationSpeed (tốc độ kéo chuột) để đảm bảo quay không ngừng
        // group.rotation.y += rotationSpeed * 0.05; // Đã loại bỏ
        // rotationSpeed *= 0.95; // Đã loại bỏ
    }
}

// ==========================================
// 3. Vòng Lặp Hoạt Hình (Animation Loop)
// ==========================================
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.001;
    const speed = 0.06;
    const mouseRotY = 0;

    camera.position.z += (targetZ - camera.position.z) * 0.05;

    updateParticleGroup(groupGold, state, speed, mouseRotY, time, false);
    updateParticleGroup(groupRed, state, speed, mouseRotY, time, true);
    updateParticleGroup(groupGift, state, speed, mouseRotY, time, false);

    if (state === 'TREE') {
        document.getElementById('status').innerText = "✊: Nắm (Thu Cây)";
        document.getElementById('status').style.color = "#FFD700";
        titleMesh.visible = true; starMesh.visible = true;
        titleMesh.scale.lerp(new THREE.Vector3(1,1,1), 0.1);
        starMesh.rotation.z -= 0.02;
        photoMeshes.forEach(m => { m.scale.lerp(new THREE.Vector3(0,0,0), 0.1); m.visible = false; });

    } else if (state === 'EXPLODE') {
        document.getElementById('status').innerText = "🖐: (Bung Quà & Quay)";
        document.getElementById('status').style.color = "#FFA500";
        titleMesh.visible = false; starMesh.visible = false;

        const baseAngle = groupGold.rotation.y;
        const angleStep = (Math.PI * 2) / photoTextures.length;
        let bestIdx = 0; let maxZ = -999;

        photoMeshes.forEach((mesh, i) => {
            mesh.visible = true;
            const angle = baseAngle + i * angleStep;
            const x = Math.sin(angle) * CONFIG.photoOrbitRadius;
            const z = Math.cos(angle) * CONFIG.photoOrbitRadius;
            const y = Math.sin(time + i) * 3;

            mesh.position.lerp(new THREE.Vector3(x, y, z), 0.1);
            mesh.lookAt(camera.position);

            if (z > maxZ) { maxZ = z; bestIdx = i; }

            if (z > 5) {
                const distScale = 1.0 + (z / CONFIG.photoOrbitRadius) * 0.8;
                mesh.scale.lerp(new THREE.Vector3(distScale, distScale, distScale), 0.1);
            } else {
                mesh.scale.lerp(new THREE.Vector3(0.6, 0.6, 0.6), 0.1);
            }
        });
        selectedIndex = bestIdx;

    } else if (state === 'PHOTO') {
        document.getElementById('status').innerText = "👌: (Xem Ảnh) ";
        document.getElementById('status').style.color = "#00FFFF";

        groupGold.rotation.y += rotationSpeed * 0.02;
        groupRed.rotation.y += rotationSpeed * 0.02;
        groupGift.rotation.y += rotationSpeed * 0.02;

        photoMeshes.forEach((mesh, i) => {
            if (i === selectedIndex) {
                mesh.position.lerp(new THREE.Vector3(0, 0, 45), 0.1);
                mesh.scale.lerp(new THREE.Vector3(5, 5, 5), 0.1);

                mesh.lookAt(camera.position);
                mesh.rotation.z = 0;
            } else {
                mesh.scale.lerp(new THREE.Vector3(0,0,0), 0.1);
            }
        });
    }

    renderer.render(scene, camera);
}

// ==========================================
// 4. Logic Điều Khiển Chuột (Drag/Scroll Logic)
// ==========================================

function onMouseWheel(event) {
    event.preventDefault();

    if (event.deltaY > 0) {
        state = 'TREE';
        targetZ = 100;
    } else if (event.deltaY < 0) {
        state = 'EXPLODE';
        targetZ = 75;
    }
}

function onMouseDown(event) {
    if (event.button === 0 && (state === 'EXPLODE' || state === 'PHOTO')) {
        isDragging = true;
        hasDragged = false; // Reset cờ kéo khi bắt đầu bấm chuột
        lastMouseX = event.clientX;
    }
}

function onMouseUp(event) {
    isDragging = false;
    // Không cần reset hasDragged ở đây. Chúng ta sẽ reset nó trong onMouseClick
    // để nó có thể được kiểm tra.
}

function onMouseMove(event) {
    if (isDragging) {
        const deltaX = event.clientX - lastMouseX;

        // Dùng một ngưỡng kéo nhỏ (ví dụ 3 pixel) để xác định đã Kéo hay chưa
        if (Math.abs(deltaX) > 3) {
            hasDragged = true; // <<< Đánh dấu đã kéo
        }

        rotationSpeed = deltaX / 500;

        groupGold.rotation.y += rotationSpeed;
        groupRed.rotation.y += rotationSpeed;
        groupGift.rotation.y += rotationSpeed;

        lastMouseX = event.clientX;
    }
}

function onMouseClick(event) {
    // Nếu hasDragged là true, có nghĩa là người dùng đã kéo, không phải click.
    if (hasDragged) {
        hasDragged = false; // Reset cờ kéo sau khi click đã được xử lý (hoặc bỏ qua)
        return; // Dừng hàm, không chuyển trạng thái PHOTO
    }

    // --- Logic Click CHỈ CHẠY KHI KHÔNG KÉO ---
    if (state === 'EXPLODE') {
        state = 'PHOTO';
        targetZ = 89; // Giữ nguyên vị trí Z
    } else if (state === 'PHOTO') {
        state = 'EXPLODE';
    }
    // ----------------------------------------

    // Nếu nó là một click thực sự, chúng ta không cần reset hasDragged vì nó đã là false
}


// function startSystem() {
//     document.getElementById('btnStart').style.display = 'none';
//     bgMusic.play().catch(e => console.log(e));
//     init3D();

//     window.addEventListener('wheel', onMouseWheel, { passive: false });
//     window.addEventListener('mousedown', onMouseDown, false);
//     window.addEventListener('mouseup', onMouseUp, false);
//     window.addEventListener('mousemove', onMouseMove, false);
//     window.addEventListener('click', onMouseClick, false);
// }

function startSystem() {
    document.getElementById('btnStart').style.display = 'none';
    // <<< HIỂN THỊ NÚT CHỌN ẢNH KHI BẮT ĐẦU
    document.getElementById('btnSelectPhotos').style.display = 'inline-block';

    bgMusic.play().catch(e => console.log(e));
    init3D();

    // ... [GIỮ NGUYÊN LOGIC CHUỘT] ...
    window.addEventListener('wheel', onMouseWheel, { passive: false });
    window.addEventListener('mousedown', onMouseDown, false);
    window.addEventListener('mouseup', onMouseUp, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    // ...

    // --- LOGIC XỬ LÝ CHỌN TỆP ---
    const fileInput = document.getElementById('fileInput');
    const selectButton = document.getElementById('btnSelectPhotos');

    selectButton.addEventListener('click', () => {
        // Kích hoạt input ẩn khi người dùng nhấn nút
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        // event.target.files chứa danh sách các tệp/thư mục được chọn
        loadNewPhotos(event.target.files);
    });
}

// ==========================================
// 5. Sự kiện Window (Window Events)
// (Giữ nguyên)
// ==========================================
window.addEventListener('resize', () => {
    if(camera) {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});
function logError(e) { document.getElementById('error-log').style.display='block'; document.getElementById('error-log').innerText+=e+"\n"; }

// startSystem()