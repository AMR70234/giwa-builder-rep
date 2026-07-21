// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title GIWA Builder Reputation
/// @notice نظام سمعة on-chain للبناة والمطورين في نظام GIWA البيئي
/// @dev MVP - العقد الأساسي: بروفايلات + شهادات موزونة (weighted attestations)
contract GiwaBuilderRep {
    // ============ Structs ============

    struct Profile {
        string handle;          // مثال: "hossam.giwa"
        string metadataURI;     // رابط بايو/بورتفوليو (اختياري)
        uint256 createdAt;
        bool exists;
    }

    struct Attestation {
        address issuer;         // مين أصدر الشهادة
        address subject;        // مين المُصدَّق له
        string category;        // مثال: "Reliable Developer"
        string evidenceURI;     // رابط الدليل (IPFS/GitHub/إلخ)
        uint256 issuerWeight;   // وزن سمعة المُصدِر وقت الإصدار
        uint256 timestamp;
    }

    // ============ State ============

    mapping(address => Profile) public profiles;
    mapping(address => Attestation[]) private attestationsBySubject;
    mapping(address => uint256) public rawScore; // مجموع الأوزان المستلمة

    // كل بروفايل جديد يبدأ بوزن أساسي بسيط عشان يقدر يصدّق شهادات
    uint256 public constant BASE_WEIGHT = 1;
    // سقف لمنع تضخم الوزن بشكل غير متناسب من مصدر واحد قوي جداً
    uint256 public constant MAX_ISSUER_WEIGHT = 100;

    // ============ Events ============

    event ProfileCreated(address indexed user, string handle, uint256 timestamp);
    event AttestationIssued(
        address indexed issuer,
        address indexed subject,
        string category,
        uint256 issuerWeight,
        uint256 timestamp
    );

    // ============ Errors ============

    error ProfileAlreadyExists();
    error ProfileDoesNotExist();
    error CannotAttestSelf();
    error EmptyHandle();

    // ============ External Functions ============

    /// @notice إنشاء بروفايل جديد للمستخدم
    function createProfile(string calldata handle, string calldata metadataURI) external {
        if (profiles[msg.sender].exists) revert ProfileAlreadyExists();
        if (bytes(handle).length == 0) revert EmptyHandle();

        profiles[msg.sender] = Profile({
            handle: handle,
            metadataURI: metadataURI,
            createdAt: block.timestamp,
            exists: true
        });

        emit ProfileCreated(msg.sender, handle, block.timestamp);
    }

    /// @notice إصدار شهادة (attestation) لعنوان آخر
    /// @dev الوزن يُحسب من سمعة المُصدِر الحالية (weighted-by-reputation)
    function issueAttestation(
        address subject,
        string calldata category,
        string calldata evidenceURI
    ) external {
        if (!profiles[msg.sender].exists) revert ProfileDoesNotExist();
        if (!profiles[subject].exists) revert ProfileDoesNotExist();
        if (subject == msg.sender) revert CannotAttestSelf();

        uint256 weight = _currentIssuerWeight(msg.sender);

        attestationsBySubject[subject].push(
            Attestation({
                issuer: msg.sender,
                subject: subject,
                category: category,
                evidenceURI: evidenceURI,
                issuerWeight: weight,
                timestamp: block.timestamp
            })
        );

        rawScore[subject] += weight;

        emit AttestationIssued(msg.sender, subject, category, weight, block.timestamp);
    }

    // ============ View Functions ============

    /// @notice استرجاع كل الشهادات الخاصة بعنوان معين
    function getAttestations(address subject) external view returns (Attestation[] memory) {
        return attestationsBySubject[subject];
    }

    /// @notice عدد الشهادات المستلمة
    function getAttestationCount(address subject) external view returns (uint256) {
        return attestationsBySubject[subject].length;
    }

    /// @notice السمعة الحالية لعنوان (تُستخدم كوزن لو صدّر شهادة)
    function _currentIssuerWeight(address issuer) internal view returns (uint256) {
        uint256 score = rawScore[issuer];
        uint256 weight = BASE_WEIGHT + (score / 10); // كل 10 نقاط سمعة = +1 وزن
        return weight > MAX_ISSUER_WEIGHT ? MAX_ISSUER_WEIGHT : weight;
    }

    /// @notice الـ Score النهائي المعروض للمستخدم (نفس rawScore حالياً، قابل للتوسعة لاحقاً)
    function getScore(address subject) external view returns (uint256) {
        return rawScore[subject];
    }
}
