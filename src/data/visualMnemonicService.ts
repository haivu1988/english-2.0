import { VisualMnemonic } from '../types';

/**
 * Rich database of visual mnemonics (Mind Palace & Visual Hooks)
 * for English vocabulary words.
 */
export const VISUAL_MNEMONICS_MAP: Record<string, VisualMnemonic> = {
  // A1-A2 / Daily & Basic
  appreciate: {
    icon: '🙏💖',
    accentColor: 'rose',
    scene: 'Một người bạn nhận được cốc cà phê nóng vào ngày mưa lạnh, mỉm cười đặt tay lên ngực áo trân trọng cảm ơn chân thành từ đáy lòng.',
    clue: 'Appreciate = "Áp vào tim": Trân trọng, cảm kích tấm lòng của người khác.',
  },
  convenient: {
    icon: '🏪⚡',
    accentColor: 'indigo',
    scene: 'Ngay dưới chân chung cư mở một cửa hàng tiện lợi 24/7 sáng rực, cần đồ ăn nóng, đồ gia dụng hay nạp thẻ chỉ cần bước 3 bước là có ngay.',
    clue: 'Convenience store = Cửa hàng tiện lợi: Thuận tiện mọi lúc mọi nơi.',
  },
  delicious: {
    icon: '🍲😋',
    accentColor: 'amber',
    scene: 'Một bát phở bò bốc khói nghi ngút thơm lừng hoa hồi, quế chi, vừa húp một thìa nước dùng là hai mắt sáng rực khen ngon nức nở.',
    clue: 'Deli = Quán đồ ăn Deli thơm ngon nức mũi!',
  },
  recommend: {
    icon: '👍✨',
    accentColor: 'emerald',
    scene: 'Đầu bếp trưởng tươi cười giơ ngón tay cái giới thiệu món đặc sản tâm đắc nhất của nhà hàng cho thực khách thưởng thức.',
    clue: 'Re-comment: Bình luận và giới thiệu điều tốt cho bạn bè.',
  },
  departure: {
    icon: '🛫🧳',
    accentColor: 'blue',
    scene: 'Chiếc máy bay lớn lăn bánh ra đường băng lúc bình minh chuẩn bị cất cánh, hành khách nhìn qua cửa sổ vẫy tay chào tạm biệt.',
    clue: 'Departure = Khởi hành (ngược với Arrival = Đến nơi ở bảng hiệu sân bay).',
  },
  destination: {
    icon: '🏝️📍',
    accentColor: 'emerald',
    scene: 'Chiếc la bàn cổ chỉ thẳng tới hòn đảo ngọc nhiệt đới có rặng dừa xanh và bãi cát trắng phau - đích đến mơ ước của kỳ nghỉ hè.',
    clue: 'Destiny (định mệnh) đưa ta đến Destination (đích đến cuộc đời).',
  },
  grocery: {
    icon: '🥖🥦',
    accentColor: 'emerald',
    scene: 'Túi giấy đi chợ đựng đầy bánh mì que giòn rụm, súp lơ xanh mướt và những quả táo đỏ tươi ngon cho bữa cơm gia đình.',
    clue: 'Grocery = Hàng thực phẩm thiết yếu mua sắm hàng ngày.',
  },
  commute: {
    icon: '🚇🎒',
    accentColor: 'blue',
    scene: 'Một bạn trẻ đeo tai nghe và balo bước lên chuyến tàu điện ngầm đông vui, ngắm thành phố lướt qua cửa sổ trên đường đi làm buổi sáng.',
    clue: 'Commute = Quãng đường di chuyển đi làm đều đặn hàng ngày.',
  },
  errand: {
    icon: '🛵📝',
    accentColor: 'amber',
    scene: 'Một người cầm mẩu giấy ghi việc vặt: gửi thư bưu điện, mua bánh mì, trả sách thư viện rồi phóng xe máy đi xử lý từng việc một.',
    clue: 'Run an errand = Chạy đi làm việc vặt cá nhân ngoài phố.',
  },
  household: {
    icon: '🏡🧹',
    accentColor: 'indigo',
    scene: 'Ngôi nhà nhỏ ấm cúng có khói bếp bay lên, cả gia đình cùng nhau dọn dẹp phòng khách, lau sàn và phơi quần áo thơm tho.',
    clue: 'Household chores = Các công việc chăm sóc tổ ấm gia đình.',
  },
  'catch up': {
    icon: '☕🗣️',
    accentColor: 'amber',
    scene: 'Hai người bạn thân lâu ngày không gặp ngồi bên tách cà phê ấm áp, cười nói rôm rả kể cho nhau nghe bao nhiêu chuyện mới.',
    clue: 'Catch up = Hàn huyên, bắt kịp thông tin của nhau sau thời gian xa cách.',
  },
  punctual: {
    icon: '⏰🎯',
    accentColor: 'emerald',
    scene: 'Chiếc đồng hồ kim chỉ chính xác 12:00 đúng từng giây, một bạn trẻ bước vào phòng họp đúng giờ hẹn với nụ cười tự tin.',
    clue: 'Point = Điểm giờ chính xác: Punctual là người luôn đúng giờ hẹn.',
  },
  budget: {
    icon: '🐷💰',
    accentColor: 'rose',
    scene: 'Chú heo đất màu hồng cười tươi khi được thả thêm đồng xu vàng tiết kiệm, bên cạnh là cuốn sổ chi tiêu rõ ràng từng khoản.',
    clue: 'Budget = Ngân sách dự trù chi tiêu hợp lý, không hoang phí.',
  },
  itinerary: {
    icon: '🗺️📌',
    accentColor: 'teal',
    scene: 'Tấm bản đồ du lịch mở rộng, có đường nét đứt nối các điểm dừng chân 1-2-3 và vé máy bay kẹp gọn gàng.',
    clue: 'Itinerary = Lịch trình chi tiết từng ngày cho chuyến du lịch.',
  },
  reservation: {
    icon: '🍽️🏷️',
    accentColor: 'violet',
    scene: 'Chiếc bàn ăn ven cửa sổ nhìn ra biển lung linh ánh nến, trên bàn đặt tấm biển vàng sang trọng khắc chữ "Reserved".',
    clue: 'Reserve = Giữ chỗ trước: Đặt bàn ăn hay phòng khách sạn trước.',
  },
  complimentary: {
    icon: '🎁✨',
    accentColor: 'emerald',
    scene: 'Khách sạn tặng khách đĩa trái cây tươi ngon kèm thiệp chào mừng và tấm vé ăn sáng miễn phí 0 đồng.',
    clue: 'Complimentary = Tặng kèm miễn phí như lời khen tri ân khách hàng.',
  },
  colleague: {
    icon: '🤝💼',
    accentColor: 'indigo',
    scene: 'Hai đồng nghiệp ngồi cạnh nhau trước màn hình máy tính, cùng cụng ly cà phê chúc mừng dự án hoàn thành thắng lợi.',
    clue: 'Colleague = Đồng nghiệp cùng chung chiến hào văn phòng.',
  },
  deadline: {
    icon: '⏳🚨',
    accentColor: 'rose',
    scene: 'Đồng hồ cát cổ đang chảy những hạt cát cuối cùng, kim đồng hồ điểm đúng nửa đêm và đèn flash đỏ nhấp nháy báo hiệu hạn chót nộp bài.',
    clue: 'Dead + Line = Hạn chót sinh tử, phải hoàn thành trước giờ G!',
  },

  // B1-B2 / Work & Daily
  procrastinate: {
    icon: '🛋️⏰',
    accentColor: 'amber',
    scene: 'Một chú mèo đeo kính lười biếng nằm đung đưa trên võng lướt điện thoại, bên cạnh là núi báo cáo cần nộp và đồng hồ báo thức reo inh ỏi.',
    clue: 'Pro (chuyên gia) + crast (chần chừ) = Chuyên gia trì hoãn deadline!',
  },
  resilient: {
    icon: '🌱⚡',
    accentColor: 'emerald',
    scene: 'Một mầm cây xanh mướt mạnh mẽ đâm chồi vươn lên qua khe nứt của tảng đá hoa cương sau cơn giông bão lớn, nở rộ hoa tươi rực rỡ.',
    clue: 'Re-silient: Giống quả bóng cao su nảy càng cao khi rơi mạnh xuống!',
  },
  resilience: {
    icon: '🎋🌪️',
    accentColor: 'emerald',
    scene: 'Cành tre dẻo dai uốn mình rạp xuống trước cơn lốc xoáy dữ dội, rồi bật thẳng tắp vươn lên bầu trời xanh kiêu hãnh.',
    clue: 'Resilience = Sức bật kiên cường, dẻo dai vượt qua mọi nghịch cảnh.',
  },
  'hit the sack': {
    icon: '🛏️🌙',
    accentColor: 'indigo',
    scene: 'Một chú gấu trúc sau ngày dài làm việc mệt nhoài, bay vút lên không trung rồi hạ cánh êm ái xuống chiếc giường nệm lông vũ bồng bềnh.',
    clue: 'Sack = Bao tải rơm làm đệm ngủ của lính xưa -> Hit the sack = Đi ngủ ngay!',
  },
  spontaneous: {
    icon: '🎒🚗',
    accentColor: 'rose',
    scene: 'Hai người bạn đang ngồi uống trà chiều bất ngờ nhìn nhau, xách balo nhảy lên xe phóng thẳng ra biển ngắm hoàng hôn không cần kế hoạch trước.',
    clue: 'Spontaneous: Ngẫu hứng, cảm xúc tự phát bùng lên là đi ngay!',
  },
  'on the fence': {
    icon: '⚖️🚧',
    accentColor: 'blue',
    scene: 'Một chú chim bồ câu ngồi đong đưa trên đỉnh hàng rào gỗ, nhìn sang trái là đĩa ngô, nhìn sang phải là đĩa hạt dẻ, mắt đảo liên hồi chưa biết sà xuống bên nào.',
    clue: 'Fence = Hàng rào -> Ngồi trên hàng rào chân lắc lư 50/50 chưa ngã ngũ!',
  },
  overwhelm: {
    icon: '🌊📚',
    accentColor: 'violet',
    scene: 'Một chú thỏ ngồi tại bàn làm việc bị cả cơn sóng thần giấy tờ, sách vở và thông báo email ập tới ngập đến tận mang tai.',
    clue: 'Over (vượt mức) + Whelm (sóng nhấn chìm) = Bị choáng ngợp, quá tải!',
  },
  overwhelmed: {
    icon: '🌊📚',
    accentColor: 'violet',
    scene: 'Một chú thỏ ngồi tại bàn làm việc bị cả cơn sóng thần giấy tờ, sách vở và thông báo email ập tới ngập đến tận mang tai.',
    clue: 'Over (vượt mức) + Whelm (sóng nhấn chìm) = Bị choáng ngợp, quá tải!',
  },
  prioritize: {
    icon: '🥇⭐',
    accentColor: 'amber',
    scene: 'Bục trao giải vinh danh công việc quan trọng nhất được nâng lên vị trí số 1 tỏa sáng hào quang, trong khi các việc phụ xếp bên dưới.',
    clue: 'Prior = Ưu tiên việc trước việc sau: Đặt việc quan trọng lên hàng đầu!',
  },
  collaborate: {
    icon: '🤝🧩',
    accentColor: 'indigo',
    scene: 'Bốn người bạn ghép 4 mảnh ghép khổng lồ khác màu vào giữa bàn, mảnh ghép vừa khít phát sáng rực rỡ tượng trưng cho sức mạnh tập thể.',
    clue: 'Co (cùng nhau) + Labor (lao động) = Cùng nhau hợp tác tạo kỳ tích!',
  },
  'cut corners': {
    icon: '✂️📐',
    accentColor: 'rose',
    scene: 'Một thợ xây dùng kéo cắt xén bớt góc bản thiết kế móng nhà để xây nhanh hơn, khiến ngôi nhà bị nghiêng ngả nguy hiểm.',
    clue: 'Cut corners = Cắt góc đi tắt đón đầu làm ẩu, giảm sút chất lượng.',
  },
  'on the same page': {
    icon: '📖🤝',
    accentColor: 'teal',
    scene: 'Hai người bạn đồng hành cùng mở chung một cuốn sách chỉ đường lớn, cùng chỉ vào một dòng chữ và gật đầu mỉm cười đồng lòng.',
    clue: 'On the same page = Cùng đọc một trang sách: Thống nhất quan điểm, cùng chung chí hướng.',
  },
  'call it a day': {
    icon: '🌇☕',
    accentColor: 'amber',
    scene: 'Mặt trời lặn sau khung cửa sổ văn phòng, đèn bàn được tắt đi, chiếc áo khoác được nhấc lên: cả nhóm chào nhau ra về nghỉ ngơi.',
    clue: 'Call it a day = Tuyên bố kết thúc một ngày làm việc năng suất!',
  },
  negotiate: {
    icon: '💼🤝',
    accentColor: 'blue',
    scene: 'Hai thương gia ngồi trước bàn cờ gỗ tinh xảo, mỉm cười đổi quân cờ và bắt tay thỏa thuận một hợp đồng đôi bên cùng có lợi (win-win).',
    clue: 'Negotiate = Đàm phán, thương lượng tìm tiếng nói chung.',
  },
  productive: {
    icon: '⚡📈',
    accentColor: 'emerald',
    scene: 'Một cỗ máy làm việc kỳ diệu với bánh răng quay tít, đầu vào là tách cà phê và đầu ra là hàng loạt dự án hoàn thành xuất sắc trước hạn.',
    clue: 'Product (sản phẩm) -> Productive = Tạo ra nhiều thành quả năng suất cao!',
  },
  empathy: {
    icon: '❤️🧠',
    accentColor: 'rose',
    scene: 'Một người đứng dưới mưa chia đôi chiếc ô ấm áp cho bạn và lắng nghe bằng cả tấm lòng, thấu hiểu trọn vẹn nỗi buồn của bạn.',
    clue: 'Em-pathy: Đặt trái tim mình vào hoàn cảnh của người khác để đồng cảm.',
  },
  meticulous: {
    icon: '🔍💎',
    accentColor: 'indigo',
    scene: 'Nghệ nhân đồng hồ đeo kính lúp soi từng chiếc bánh răng nhỏ xíu bằng vàng, chỉnh từng milimet với sự cẩn trọng tỉ mỉ tuyệt đối.',
    clue: 'Meticulous = Tỉ mỉ, chau chuốt đến từng tiểu tiết nhỏ nhất.',
  },
  versatile: {
    icon: '🛠️🤹',
    accentColor: 'teal',
    scene: 'Chiếc dao đa năng Thụy Sĩ mở ra đủ các đầu dao, kéo, tua-vít và thước kẻ, việc gì trên bàn làm việc cũng xử lý gọn gàng.',
    clue: 'Versatile = Đa năng, xoay chuyển tình thế linh hoạt mọi mặt.',
  },
  indispensable: {
    icon: '🗝️⚡',
    accentColor: 'amber',
    scene: 'Chiếc chìa khóa vàng độc nhất mở được cánh cổng nguồn điện nuôi sống cả thành phố, thiếu nó mọi thứ ngừng hoạt động.',
    clue: 'Indispensable = Cốt lõi thiết yếu tuyệt đối, không thể thiếu được.',
  },
  tackle: {
    icon: '🏈💥',
    accentColor: 'orange',
    scene: 'Cầu thủ dũng cảm lao người về phía trước ôm ghì tảng đá lớn cản đường, quyết tâm dọn sạch mọi trở ngại khó khăn.',
    clue: 'Tackle = Quyết liệt đối mặt và giải quyết dứt điểm vấn đề!',
  },

  // TOEIC, Business & Tech
  implement: {
    icon: '⚙️🏗️',
    accentColor: 'blue',
    scene: 'Kỹ sư trưởng vặn chiếc cờ lê khởi động cỗ máy dây chuyền sản xuất mới, các băng chuyền bắt đầu vận hành trơn tru theo đúng bản vẽ.',
    clue: 'Implement = Bắt tay thực thi, triển khai kế hoạch vào thực tế.',
  },
  feasibility: {
    icon: '📋⚖️',
    accentColor: 'emerald',
    scene: 'Một chiếc cân thăng bằng giữa chi phí và lợi ích, bên cạnh là tập hồ sơ thẩm định được đóng dấu xanh "Đạt tính khả thi".',
    clue: 'Feasible = Làm được: Đánh giá khả năng dự án có thực hiện được không.',
  },
  streamline: {
    icon: '🌊➡️',
    accentColor: 'cyan',
    scene: 'Đoàn tàu cao tốc hình viên đạn lướt xé gió trên đường ray thẳng tắp, những đoạn cua khúc khuỷu rườm rà đều được gỡ bỏ.',
    clue: 'Streamline = Tinh gọn quy trình, biến đường vòng thành đường thẳng thông suốt.',
  },
  lucrative: {
    icon: '💰📈',
    accentColor: 'amber',
    scene: 'Một chậu cây nhỏ bất ngờ mọc ra những đồng tiền vàng sáng lấp lánh, biểu đồ lợi nhuận tài chính vút thẳng lên mây xanh.',
    clue: 'Lucrative = Siêu sinh lời, thương vụ hái ra tiền béo bở!',
  },
  scalability: {
    icon: '🧱📈',
    accentColor: 'indigo',
    scene: 'Tòa tháp xếp từ những khối Lego thông minh có thể dễ dàng gắn thêm tầng cao gấp 10 lần mà móng nhà vẫn vững như bàn thạch.',
    clue: 'Scale = Mở rộng quy mô: Hệ thống chịu tải lớn mà không lo bị nghẽn.',
  },
  bottleneck: {
    icon: '🍾⚠️',
    accentColor: 'rose',
    scene: 'Dòng xe cộ đông đúc bị thắt nút lại tại một cây cầu hẹp giống như cổ chai, khiến mọi phương tiện phía sau bị dồn ứ chậm chạp.',
    clue: 'Bottleneck = Cổ chai: Điểm nghẽn làm đình trệ toàn bộ tiến độ.',
  },

  // C1-C2 & IELTS Academic
  ubiquitous: {
    icon: '🌐📱',
    accentColor: 'blue',
    scene: 'Dù ở vùng núi cao, đảo xa hay trên máy bay giữa trời mây, đi đâu cũng nhìn thấy sóng Wifi và màn hình smartphone sáng lấp lánh.',
    clue: 'Ubiquitous = Phổ biến ở khắp mọi nơi (như mạng Internet ngày nay).',
  },
  exacerbate: {
    icon: '🔥🛢️',
    accentColor: 'rose',
    scene: 'Một đống lửa đang cháy âm ỉ bỗng bị ai đó đổ thêm can dầu vào khiến ngọn lửa bùng lên dữ dội gấp mười lần.',
    clue: 'Exacerbate = Đổ thêm dầu vào lửa: Làm tình hình trầm trọng thêm.',
  },
  counterproductive: {
    icon: '🚣‍♂️↩️',
    accentColor: 'rose',
    scene: 'Người chèo thuyền ra sức quạt mái chèo nhưng lại chèo ngược hướng dòng chảy khiến thuyền lùi lại phía sau.',
    clue: 'Counter (ngược) + Productive (hiệu quả) = Làm chỉ tổ phản tác dụng!',
  },
  scrutinize: {
    icon: '🔬📑',
    accentColor: 'indigo',
    scene: 'Vị thám tử cầm kính hiển vi soi kỹ từng dấu vân tay và con số tài chính trên tờ hợp đồng, không bỏ sót bất kỳ hạt bụi nào.',
    clue: 'Scrutinize = Soi xét, kiểm tra cực kỳ ngặt nghèo từng chi tiết.',
  },
  articulate: {
    icon: '💎🎙️',
    accentColor: 'indigo',
    scene: 'Diễn giả đứng trước micro phát biểu, từng câu từ phát ra trong trẻo và sáng rõ như những viên pha lê hoàn mỹ.',
    clue: 'Articulate = Diễn đạt mạch lạc, khúc chiết, ăn nói lưu loát.',
  },
  ambiguous: {
    icon: '🌫️❓',
    accentColor: 'violet',
    scene: 'Tấm biển chỉ đường ở ngã ba bị sương mù dày đặc bao phủ, hai mũi tên chỉ hai hướng trái ngược nhau khiến người đi đường bối rối.',
    clue: 'Ambi (hai hướng) = Mập mờ, nước đôi, hiểu theo cách nào cũng được.',
  },
  serendipity: {
    icon: '🍀✨',
    accentColor: 'emerald',
    scene: 'Một người vào tiệm sách cũ trú cơn mưa rào bất chợt, tình cờ rút một cuốn sách trên giá và tìm thấy bức thư kỷ niệm quý giá bị thất lạc.',
    clue: 'Serendipity = Cơ duyên may mắn bất ngờ tìm thấy điều tuyệt vời.',
  },
  perseverance: {
    icon: '🧗‍♂️🏔️',
    accentColor: 'amber',
    scene: 'Nhà leo núi kiên trì bám vào từng vách đá gồ ghề giữa trời tuyết rơi, từng bước một chinh phục đỉnh núi tuyết cao ngất ngưởng.',
    clue: 'Persevere = Kiên trì bền bỉ, không bao giờ bỏ cuộc.',
  },
  eloquent: {
    icon: '🎙️🕊️',
    accentColor: 'indigo',
    scene: 'Nhà diễn thuyết bước lên bục giảng, từng lời nói cất lên du dương truyền cảm như những cánh chim câu mang thông điệp chạm tới trái tim người nghe.',
    clue: 'Eloquent = Hùng biện lưu loát, lời nói có sức lôi cuốn diệu kỳ.',
  },
  pragmatic: {
    icon: '🛠️📐',
    accentColor: 'emerald',
    scene: 'Một kỹ sư cầm chiếc thước đo và hộp đồ nghề, bỏ qua những lý thuyết hoa mỹ để sửa ngay chiếc máy bơm nước đang hỏng cho người dân.',
    clue: 'Pragmatic = Thực dụng, thực tế, tập trung vào giải pháp hiệu quả thiết thực.',
  },
};

const ACCENT_COLORS = ['indigo', 'emerald', 'amber', 'rose', 'violet', 'blue', 'teal'] as const;

/**
 * Returns a high-quality visual mnemonic for any English word.
 * If in database, returns pre-crafted masterpiece.
 * Otherwise, procedurally crafts a fun, memorable Vietnamese visual scene.
 */
export function getVisualMnemonicForWord(
  word: string,
  meaning?: string,
  category?: string
): VisualMnemonic {
  const cleanWord = (word || '').toLowerCase().trim();

  // 1. Direct hit in curated database
  if (VISUAL_MNEMONICS_MAP[cleanWord]) {
    return VISUAL_MNEMONICS_MAP[cleanWord];
  }

  // 2. Partial word match in database
  for (const [key, mnemonic] of Object.entries(VISUAL_MNEMONICS_MAP)) {
    if (cleanWord.includes(key) || key.includes(cleanWord)) {
      return {
        ...mnemonic,
        clue: `Liên tưởng "${word}" giống mẹo của "${key}": ${mnemonic.clue}`,
      };
    }
  }

  // 3. Category/meaning semantic generator with accurate icons
  const cleanMeaning = (meaning || '').toLowerCase().trim();
  const colorIndex = Math.abs(cleanWord.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % ACCENT_COLORS.length;
  const accentColor = ACCENT_COLORS[colorIndex];

  let icon = '🎯✨';
  let themeDescription = `hình ảnh trực quan mô tả nghĩa "${meaning || word}"`;

  if (/sleep|bed|tired|sack|rest|night/i.test(cleanWord) || /ngủ|nghỉ|mệt|đêm/i.test(cleanMeaning)) {
    icon = '🛏️🌙';
    themeDescription = 'giấc ngủ êm ái trên chiếc giường ấm áp dưới ánh trăng';
  } else if (/travel|trip|flight|plane|journey|airport|ticket/i.test(cleanWord) || /du lịch|đi lại|máy bay|vé|sân bay/i.test(cleanMeaning)) {
    icon = '✈️🌍';
    themeDescription = 'chuyến bay vi vu trên bầu trời mở ra chân trời mới';
  } else if (/food|eat|drink|delicious|taste|restaurant|dish|cook|meal/i.test(cleanWord) || /ăn|uống|ngon|món|nấu|nhà hàng/i.test(cleanMeaning)) {
    icon = '🍲😋';
    themeDescription = 'món ăn thơm ngon nghi ngút khói kích thích vị giác';
  } else if (/work|job|boss|meeting|deadline|office|colleague/i.test(cleanWord) || /công việc|họp|báo cáo|văn phòng|đồng nghiệp/i.test(cleanMeaning)) {
    icon = '💼📊';
    themeDescription = 'môi trường công sở với bàn làm việc và mục tiêu rõ ràng';
  } else if (/love|heart|care|friend|empathy|kind/i.test(cleanWord) || /yêu|bạn|quan tâm|tình cảm|thấu hiểu/i.test(cleanMeaning)) {
    icon = '💖🤗';
    themeDescription = 'trái tim ấm áp và sự đồng cảm chân thành giữa bạn bè';
  } else if (/money|cash|profit|cost|price|budget|finance/i.test(cleanWord) || /tiền|lợi nhuận|giá|ngân sách|tài chính/i.test(cleanMeaning)) {
    icon = '💰📈';
    themeDescription = 'túi tiền vàng và biểu đồ tăng trưởng tài chính';
  } else if (/study|learn|book|read|know|school|exam/i.test(cleanWord) || /học|sách|đọc|hiểu|thi|trường/i.test(cleanMeaning)) {
    icon = '📚🧠';
    themeDescription = 'trang sách rộng mở cùng ánh đèn tri thức soi sáng';
  } else if (/time|hour|delay|hurry|fast|clock|punctual/i.test(cleanWord) || /thời gian|nhanh|chậm|đồng hồ|đúng giờ/i.test(cleanMeaning)) {
    icon = '⏰⚡';
    themeDescription = 'kim đồng hồ quay đều nhắc nhở khoảnh khắc vàng';
  } else if (/animal|dog|cat|bird|pet|wild/i.test(cleanWord) || /động vật|chó|mèo|chim|thú/i.test(cleanMeaning)) {
    icon = '🐾🦁';
    themeDescription = 'chú thú cưng đáng yêu hoạt bát';
  } else if (/tech|computer|code|software|app|data/i.test(cleanWord) || /công nghệ|máy tính|mã|phần mềm|dữ liệu/i.test(cleanMeaning)) {
    icon = '💻⚡';
    themeDescription = 'màn hình công nghệ phát sáng xử lý thông tin thông minh';
  }

  const scene = `Hình ảnh sinh động: ${themeDescription}. Bối cảnh hoạt họa rõ nét này gắn chặt nghĩa "${meaning || cleanWord}" vào lâu đài trí nhớ (Mind Palace) của bạn.`;
  const clue = `Gắn hình ảnh ${icon} với từ "${word}" (${meaning || 'nghĩa cốt lõi'}) để nhớ mãi không quên!`;

  return {
    icon,
    scene,
    clue,
    accentColor,
  };
}
